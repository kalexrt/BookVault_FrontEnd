import { UserApi } from "../api/user.api";
import { userProfileData } from "../constants/constants";
import { formatDate } from "../utils/formatDate";
import { Toast } from "../utils/toast";
import { NavBarActions } from "./navbar.script";

export class ProfileActions {
  static init: () => void = () => {
    ProfileActions.loadProfileData();

    //get buttons
    const editProfileButton = document.getElementById("editProfileBtn") as HTMLButtonElement;
    const deleteProfileButton = document.getElementById("deleteProfileBtn") as HTMLButtonElement;
    const cancelEditProfileButton = document.getElementById("cancelEditProfileBtn") as HTMLButtonElement;
    const saveProfileButton = document.getElementById("saveProfileBtn") as HTMLButtonElement;

    //add button actions
    deleteProfileButton.addEventListener("click", ProfileActions.deleteMyProfile);
    editProfileButton.addEventListener("click", ProfileActions.editMyProfile);
    cancelEditProfileButton.addEventListener("click", ProfileActions.cancelEditProfile);
    saveProfileButton.addEventListener("click", ProfileActions.saveProfile);
  };

  //delete profile
  static async deleteMyProfile() {
    try {
      const confirmDelete = confirm(
        "Are you sure you want to delete your profile?"
      );
      if (confirmDelete) {
        await UserApi.deleteMyProfile();
        NavBarActions.handleLogout();
        Toast.showToast("Profile deleted successfully", "success");
      }
    } catch (error) {
      Toast.showToast("Error deleting profile:", "error");
    }
  }

  //edit profile
  static async editMyProfile() {
    //make it visible
    const editProfileWindow = document.getElementById(
      "editProfileWindow"
    ) as HTMLElement;
    editProfileWindow.classList.remove("hidden");
    editProfileWindow.classList.add("flex");

    //get form elements
    const nameInput = document.getElementById("editName") as HTMLInputElement;
    const emailInput = document.getElementById("editEmail") as HTMLInputElement;
    const genderInput = document.getElementById("editGender") as HTMLInputElement;
    const ageInput = document.getElementById("editAge") as HTMLInputElement;

    try {
      //set default values
      nameInput.value = userProfileData[0].name;
      emailInput.value = userProfileData[0].email;
      genderInput.value = userProfileData[0].gender;
      ageInput.value = userProfileData[0].age.toString();
    } catch (error) {
      Toast.showToast("Error loading profile data:", "error");
    }
  }

  //cancel edit profile
  static cancelEditProfile() {
    //make it hidden
    const editProfileWindow = document.getElementById(
      "editProfileWindow"
    ) as HTMLElement;
    editProfileWindow.classList.remove("flex");
    editProfileWindow.classList.add("hidden");
  }

  //save profile after editing
  static async saveProfile() {
    //get form elements
    const nameInput = document.getElementById("editName") as HTMLInputElement;
    const emailInput = document.getElementById("editEmail") as HTMLInputElement;
    const genderInput = document.getElementById("editGender") as HTMLInputElement;
    const ageInput = document.getElementById("editAge") as HTMLInputElement;
    const passwordInput = document.getElementById("editPassword") as HTMLInputElement;

     // Check if password is empty
     if (!passwordInput.value) {
      Toast.showToast("Password cannot be empty", "error");
    }

    //put values in object
    const data ={
      name : nameInput.value,
      gender : genderInput.value,
      age : parseInt(ageInput.value),
      password : passwordInput.value,
      email : emailInput.value,
    }

    try {
      //update profile
      await UserApi.updateMyProfile(data);
      Toast.showToast("Profile updated successfully", "success");
      ProfileActions.loadProfileData();
    } catch (error) {
    }
  }  

  //load profile data
  static async loadProfileData() {
    try {
      //fetch Data
      const profileData = await UserApi.getMyProfile();
      userProfileData.push(profileData);

      const userIdElement = document.getElementById("userId");
      if (userIdElement) userIdElement.innerText = profileData.id;

      const userNameElement = document.getElementById("userName");
      if (userNameElement) userNameElement.innerText = profileData.name;

      const userRoleElement = document.getElementById("userRole");
      if (userRoleElement) userRoleElement.innerText = profileData.roles[0];

      const userEmailElement = document.getElementById("userEmail");
      if (userEmailElement) userEmailElement.innerText = profileData.email;

      const userGenderElement = document.getElementById("userGender");
      if (userGenderElement) userGenderElement.innerText = profileData.gender;

      const userAgeElement = document.getElementById("userAge");
      if (userAgeElement) userAgeElement.innerText = profileData.age;

      const totalBooksBorrowedElement =
        document.getElementById("totalBooksBorrowed");
      if (totalBooksBorrowedElement)
        totalBooksBorrowedElement.innerText = profileData.total_books_borrowed;

      const accountCreationDateElement = document.getElementById(
        "accountCreationDate"
      );
      if (accountCreationDateElement)
        accountCreationDateElement.innerText = formatDate(
          profileData.created_at
        );
    } catch (error) {
      Toast.showToast("Error loading profile data:", "error");
    }
  }
}
