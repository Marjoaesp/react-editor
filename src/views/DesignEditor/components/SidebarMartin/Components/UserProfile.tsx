import React from 'react';

interface ProfileAvatarProps {
  username: string;
  profilePictureUrl?: string;
}

const UserProfile: React.FC<ProfileAvatarProps> = ({ username, profilePictureUrl }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: "15%", marginLeft: "5px" }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginRight: '8px'
        }}
      >
        <img
          src={profilePictureUrl || 'https://fs.edform.com/pQf/Nm2/WmQ/vC2/K9d/tA5/bf1/Q?response-content-type=image%2Fwebp'}
          alt="Profile"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div>{username}</div>
    </div>
    
  );
};

export default UserProfile;
