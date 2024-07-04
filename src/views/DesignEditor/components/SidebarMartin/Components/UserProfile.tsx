import React from 'react';

interface ProfileAvatarProps {
  username: string;
  profilePictureUrl?: string;
}

const UserProfile: React.FC<ProfileAvatarProps> = ({ username, profilePictureUrl }) => {
  return (
    <div className="flex items-center mt-[15%] ml-1">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
        <img
          src={profilePictureUrl || 'https://fs.edform.com/pQf/Nm2/WmQ/vC2/K9d/tA5/bf1/Q?response-content-type=image%2Fwebp'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div>{username}</div>
    </div>
  );
};

export default UserProfile;
