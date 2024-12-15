import React, { useState, useEffect } from "react";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { $user } from "../../store/auth/store";
import Modal from "../../components/Modal/Modal";
import { updateUserFx } from "../../store/auth/effects";
import './MyProfile.scss'

interface UserProfile {
  firstName: string;
  lastName: string;
  birthDate: string;
  image: string | File;
}

const MyProfile: React.FC = () => {
  const [user] = useUnit([$user]);
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    birthDate: "",
    image: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      setProfileData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        birthDate: user?.birthDate || "",
        image: user?.image || "",
      });
    }
  }, [user, navigate]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setProfileData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { firstName, lastName, birthDate, image } = profileData;
  
      await updateUserFx({
        firstName,
        lastName,
        birthDate,
        image,
      });
  
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  
  return (
    <div className="my-profile">
      <h1 className="my-profile__title">My Profile</h1>
      <div className="my-profile__content">
        <div className="my-profile__image-container">
          {user?.image ? (
            <img
              src={user.image}
              alt={`${user?.firstName} ${user?.lastName}`}
              className="my-profile__image"
            />
          ) : (
            <div className="my-profile__placeholder">No Image</div>
          )}
        </div>

        <div className="my-profile__details">
          <p className="my-profile__detail">
            <strong>Email:</strong> {user?.email}
          </p>
          <p className="my-profile__detail">
            <strong>Name:</strong> {user?.firstName}
          </p>
          <p className="my-profile__detail">
            <strong>Last Name:</strong> {user?.lastName}
          </p>
          <p className="my-profile__detail">
            <strong>Birth Date:</strong> {user?.birthDate}
          </p>
        </div>

        <button className="my-profile__edit-button" onClick={handleOpenModal}>
          Edit Profile
        </button>
      </div>

      <Modal title="Update Profile" isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="my-profile__modal">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Birth Date:
            <input
              type="date"
              name="birthDate"
              value={profileData.birthDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Profile Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          <button onClick={handleSaveProfile}>Save</button>
        </div>
      </Modal>
    </div>
  );
};

export default MyProfile;
