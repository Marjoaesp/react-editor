document.addEventListener('DOMContentLoaded', function() {
    var slideshow = document.querySelector('.slideshow');
    var currentIndex = 0;
    var timeout;
    var currentImages = [];
    var defaultDisplayTime = 5000; // Default display time, will be updated from JSON
    var configUrl = 'https://cast-aeropuerto.desarrollosnea.com/config.json'; // URL to fetch the JSON configuration
    var dbName = 'SlideshowDatabase';
    var storeName = 'zipFiles';
    var versionStoreName = 'version';
    var currentZipKey = 'currentZip';
    var defaultFolder = 'default-images'; // Path to your default images folder
    var versionDisplay = document.getElementById('versionDisplay'); // Element to display the version

    // Function to get the estimated available storage (simplified for this example)
    function getAvailableStorage() {
        return navigator.storage.estimate().then(estimate => estimate.quota - estimate.usage);
    }

    function openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);

            request.onupgradeneeded = function(event) {
                console.log('Upgrading database...');
                const db = event.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                    console.log('Object store "zipFiles" created.');
                }
                if (!db.objectStoreNames.contains(versionStoreName)) {
                    db.createObjectStore(versionStoreName);
                    console.log('Object store "version" created.');
                }
            };

            request.onsuccess = function(event) {
                console.log('Database opened successfully.');
                resolve(event.target.result);
            };

            request.onerror = function(event) {
                console.error('Database error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    function saveToIndexedDB(storeName, value, key) {
        return openDatabase().then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName], 'readwrite');
                const objectStore = transaction.objectStore(storeName);
                const request = objectStore.put(value, key);

                request.onsuccess = function() {
                    console.log('Data saved to IndexedDB.');
                    resolve();
                };

                request.onerror = function(event) {
                    console.error('Save error:', event.target.error);
                    reject(event.target.error);
                };
            });
        });
    }

    function getFromIndexedDB(storeName, key) {
        return openDatabase().then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storeName]);
                const objectStore = transaction.objectStore(storeName);
                const request = objectStore.get(key);

                request.onsuccess = function(event) {
                    console.log('Data retrieved from IndexedDB.');
                    resolve(event.target.result);
                };

                request.onerror = function(event) {
                    console.error('Get error:', event.target.error);
                    reject(event.target.error);
                };
            });
        });
    }

    async function fetchConfig() {
        const response = await fetch(configUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch config');
        }
        const config = await response.json();
        return config;
    }

    async function fetchAndExtractZip(zipUrl) {
        const response = await fetch(zipUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch zip file');
        }
        const blob = await response.blob();
        return blob;
    }

    async function processConfig(zip) {
        try {
            const mediaFiles = [];
            const orderFile = zip.file("order.json");
            let order = [];

            // Detailed logging of all files in the ZIP
            console.log('Files in ZIP:');
            for (let filename in zip.files) {
                console.log(filename);
            }

            if (orderFile) {
                console.log('order.json found.');
                const orderBlob = await orderFile.async("string");
                const orderJson = JSON.parse(orderBlob);
                order = orderJson.orden; // Get the "orden" array from the JSON
                console.log('Order:', order);
            } else {
                console.log('order.json not found in the ZIP file.');
            }

            const fileProcessingPromises = Object.keys(zip.files).map(async filename => {
                if (filename.match(/\.jpg$/i)) {
                    const file = zip.file(filename);
                    const blob = await file.async("blob");
                    const objectURL = URL.createObjectURL(blob);
                    mediaFiles.push({ title: filename, url: objectURL, isVideo: false });
                } else if (filename.match(/\.mp4$/i)) {
                    const file = zip.file(filename);
                    const blob = await file.async("blob");
                    const objectURL = URL.createObjectURL(blob);
                    const video = document.createElement('video');
                    video.src = objectURL;
                    video.load();
                    await new Promise(resolve => {
                        video.addEventListener('loadedmetadata', function() {
                            const duration = Math.round(video.duration * 1000);
                            mediaFiles.push({ title: filename, url: objectURL, isVideo: true, displayTime: duration });
                            resolve();
                        });
                    });
                }
            });

            await Promise.all(fileProcessingPromises);

            if (order.length) {
                const orderedMediaFiles = order.map(filename => {
                    return mediaFiles.find(file => file.title === filename);
                }).filter(file => file !== undefined);

                return orderedMediaFiles;
            }

            return mediaFiles;
        } catch (error) {
            console.error('Error processing config:', error);
            throw error;
        }
    }

    function showSlide(index) {
        var slides = document.querySelectorAll('.slideshow li');
        slides.forEach(function(slide, i) {
            var span = slide.querySelector('span');
            var video = slide.querySelector('video');
            var div = slide.querySelector('div');

            if (i === index) {
                if (span) {
                    span.style.opacity = 1;
                    span.style.transform = 'scale(1.0)';
                }
                if (video) {
                    video.style.opacity = 1;
                    video.currentTime = 0;
                    video.play();
                }
                div.style.opacity = 1;
            } else {
                if (span) {
                    span.style.opacity = 0;
                    span.style.transform = 'scale(1)';
                }
                if (video) {
                    video.style.opacity = 0;
                    video.pause();
                    video.currentTime = 0;
                }
                div.style.opacity = 0;
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showSlide(currentIndex);
        clearTimeout(timeout);
        var currentSlide = currentImages[currentIndex];
        timeout = setTimeout(nextSlide, currentSlide.displayTime || defaultDisplayTime);
    }

    function cacheMediaFiles(images) {
        images.forEach(function(image) {
            var fullUrl = image.url;
            if (!image.isVideo) {
                var img = new Image();
                img.src = fullUrl;
            }
        });
    }

    function initSlideshow(images) {
        slideshow.innerHTML = '';
        images.forEach(function(image) {
            var li = document.createElement('li');
            var div = document.createElement('div');

            li.appendChild(div);

            var fullUrl = image.url;

            if (image.isVideo) {
                var video = document.createElement('video');
                video.src = fullUrl;
                video.autoplay = false;
                video.muted = true;
                video.loop = false;
                video.style.opacity = 0;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                video.style.position = 'absolute';
                video.style.top = 0;
                video.style.left = 0;
                li.appendChild(video);
            } else {
                var span = document.createElement('span');
                span.style.backgroundImage = 'url(' + fullUrl + ')';
                li.appendChild(span);
            }
            slideshow.appendChild(li);
        });
        currentImages = images;
        cacheMediaFiles(images);
        currentIndex = 0;
        showSlide(currentIndex);
        clearTimeout(timeout);
        timeout = setTimeout(nextSlide, currentImages[currentIndex].displayTime || defaultDisplayTime);
    }

    async function loadDefaultImages() {
        const defaultImages = [];
        const filenames = ['image.jpg', 'image2.jpg', 'image3.jpg'];
        for (const filename of filenames) {
            const url = `${defaultFolder}/${filename}`;
            const img = new Image();
            img.src = url;
            await new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
            defaultImages.push({ title: filename, url: url, isVideo: false });
        }
        initSlideshow(defaultImages);
    }

    async function updateSlideshow() {
        try {
            const config = await fetchConfig();

            // Update default display time from config
            defaultDisplayTime = config[0].defaultTime;

            // Show "Updating..." in the version display
            versionDisplay.textContent = 'Version: Updating...';

            // Fetch new ZIP file and update the slideshow
            const storedVersion = await getFromIndexedDB(versionStoreName, 'version');
            if (storedVersion !== config[0].serialVersion) {
                console.log('New version detected, updating slideshow...');

                // Check available storage before downloading
                const availableStorage = await getAvailableStorage();
                if (availableStorage < 400 * 1024 * 1024) { // Assuming ZIP size is ~400MB
                    console.log('Insufficient storage, deleting old ZIP file...');
                    await saveToIndexedDB(storeName, null, currentZipKey); // Delete old ZIP file
                }

                const zipBlob = await fetchAndExtractZip(config[0].zipPath);

                // Save the new ZIP blob and version to IndexedDB
                await saveToIndexedDB(storeName, zipBlob, currentZipKey);
                await saveToIndexedDB(versionStoreName, config[0].serialVersion, 'version');

                // Extract and process the new ZIP file
                const zip = await JSZip.loadAsync(zipBlob);
                const mediaFiles = await processConfig(zip);

                // Initialize slideshow with new media files
                initSlideshow(mediaFiles);

                // Update version display
                versionDisplay.textContent = 'Version: ' + config[0].serialVersion + ' Date: ' + config[0].DateVersion;
            } else {
                console.log('No new version, loading stored ZIP file...');
                const zipBlob = await getFromIndexedDB(storeName, currentZipKey);

                // Extract and process the stored ZIP file
                const zip = await JSZip.loadAsync(zipBlob);
                const mediaFiles = await processConfig(zip);

                // Initialize slideshow with stored media files
                initSlideshow(mediaFiles);

                // Update version display
                versionDisplay.textContent = 'Version: ' + storedVersion + ' Date: ' + config[0].DateVersion;
            }
        } catch (error) {
            console.error('Failed to update slideshow:', error);
            const storedZipBlob = await getFromIndexedDB(storeName, currentZipKey);

            if (storedZipBlob) {
                // If a stored ZIP file exists, extract and process it
                const zip = await JSZip.loadAsync(storedZipBlob);
                const mediaFiles = await processConfig(zip);
                initSlideshow(mediaFiles);

                // Update version display with the stored version
                const storedVersion = await getFromIndexedDB(versionStoreName, 'version');
                versionDisplay.textContent = 'Version: ' + storedVersion + ' Date: N/A';
            } else {
                // If no stored ZIP file is found, load default images
                await loadDefaultImages();
                versionDisplay.textContent = 'Version: N/A Date: N/A';
            }
        }
    }

    async function checkForUpdates() {
        try {
            const config = await fetchConfig();

            // Update default display time from config
            defaultDisplayTime = config[0].defaultTime;

            // Get current version from IndexedDB
            const storedVersion = await getFromIndexedDB(versionStoreName, 'version');

            console.log('StoredVersion = ' + storedVersion, ' || config.SerialVersion = ' + config[0].serialVersion);
            console.log('Display time:', config[0].defaultTime);

            // Check if the version has changed
            if (storedVersion !== config[0].serialVersion) {
                console.log('New version detected in update check, updating slideshow...');

                // Show "Updating..." in the version display
                versionDisplay.textContent = 'Version: Updating...';

                // Check available storage before downloading
                const availableStorage = await getAvailableStorage();
                if (availableStorage < 400 * 1024 * 1024) { // Assuming ZIP size is ~400MB
                    console.log('Insufficient storage, deleting old ZIP file...');
                    await saveToIndexedDB(storeName, null, currentZipKey); // Delete old ZIP file
                }

                // Fetch new ZIP file
                const zipBlob = await fetchAndExtractZip(config[0].zipPath);

                // Save the new ZIP blob and version to IndexedDB
                await saveToIndexedDB(storeName, zipBlob, currentZipKey);
                await saveToIndexedDB(versionStoreName, config[0].serialVersion, 'version');

                // Extract and process the new ZIP file
                const zip = await JSZip.loadAsync(zipBlob);
                const mediaFiles = await processConfig(zip);

                // Initialize slideshow with new media files
                initSlideshow(mediaFiles);

                // Update version display
                versionDisplay.textContent = 'Version: ' + config[0].serialVersion + ' Date: ' + config[0].DateVersion;
            } else {
                console.log('No new version...');
                versionDisplay.textContent = 'V ' + storedVersion + ' - ' + config[0].DateVersion;
            }
        } catch (error) {
            console.error('Failed to check for updates:', error);
        } finally {
            setTimeout(checkForUpdates, 15000); // Check for updates every 15 seconds
        }
    }

    // Initial fetch and start slideshow
    //indexedDB.deleteDatabase('SlideshowDatabase'); // Borrar para testear si se mantiene la DB, puesto ahora porque en muchos tests
    // se vuelven corruptas las DB y no funcionan con codigo nuevo
    updateSlideshow().then(() => {
        checkForUpdates();
    }).catch(error => {
        console.error('Initial slideshow update failed:', error);
        loadDefaultImages().then(() => {
            checkForUpdates();
        }).catch(error => {
            console.error('Failed to load default images:', error);
        });
    });
});



