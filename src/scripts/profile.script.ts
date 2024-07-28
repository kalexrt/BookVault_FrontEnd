import { UserApi } from "../api/user.api";
import { formatDate } from "../utils/formatDate";
import { Toast } from "../utils/toast";
import { NavBarActions } from "./navbar.script";

export class ProfileActions {
  static init: () => void = () => {
    ProfileActions.loadProfileData();
    //button actions
    const editProfileButton = document.getElementById("editProfileBtn") as HTMLButtonElement;
    const deleteProfileButton = document.getElementById("deleteProfileBtn")as HTMLButtonElement;

    deleteProfileButton.addEventListener("click", ProfileActions.deleteMyProfile);
    editProfileButton.addEventListener("click", ProfileActions.editMyProfile);
  };

  //delete profile
  static async deleteMyProfile(){
    try {
      const confirmDelete = confirm("Are you sure you want to delete your profile?");
      if (confirmDelete) {
        await UserApi.deleteMyProfile();
        NavBarActions.handleLogout();
        Toast.showToast("Profile deleted successfully", "success");
      }
    } catch (error) {
      Toast.showToast("Error deleting profile:", "error");
    }
  };

  //edit profile
  static async editMyProfile(){

  }

  //load profile data
  static async loadProfileData() {
    try {
      //fetch Data
      const profileData = await UserApi.getMyProfile();

      const userIdElement = document.getElementById("userId");
      if (userIdElement) userIdElement.innerText = profileData.id;

      const userNameElement = document.getElementById("userName");
      if (userNameElement) userNameElement.innerText = profileData.name;

      const userRoleElement = document.getElementById("userRole");
      if (userRoleElement) userRoleElement.innerText = profileData.roles[0];

      const userEmailElement = document.getElementById("userEmail");
      if (userEmailElement) userEmailElement.innerText = profileData.email;

      const userGenderElement = document.getElementById("userGender");
      if (userGenderElement)
        userGenderElement.innerText = profileData.gender;

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
        accountCreationDateElement.innerText = formatDate(profileData.created_at);
    } catch (error) {
      Toast.showToast("Error loading profile data:", "error");
    }
  }
}
