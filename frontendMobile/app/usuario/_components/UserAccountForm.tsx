import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import UserAccountSection from "./UserAccountSection";
import AccountInfoField from "./AccountInfoField";
import AccountFormActions from "./AccountFormActions";
import UsuarioDropdown from "./ApiDropdown";

interface UserData {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
}

const UserAccountForm: React.FC = () => {
  const t = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: "Alex123",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    firstName: "Alex",
    lastName: "Johnson",
    bio: "Magic: The Gathering enthusiast and collector since 2015. Always looking for rare cards and competitive decks.",
    location: "San Francisco, CA",
  });
  const [selectedUserNickname, setSelectedUserNickname] = useState<
    string | undefined
  >(undefined);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving user data:", userData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // TODO: Reset to original data
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDropdownSelection = (item: {
    id: string;
    label: string;
    value: string;
  }) => {
    console.log("Dropdown selection:", item);
    // TODO: Handle dropdown selection logic
  };

  return (
    <View style={styles.container}>
      <UserAccountSection title="Account Information">
        <AccountInfoField
          label="Username"
          value={userData.username}
          onChangeText={(value) => handleFieldChange("username", value)}
          isEditable={isEditing}
        />
        <AccountInfoField
          label="Email"
          value={userData.email}
          onChangeText={(value) => handleFieldChange("email", value)}
          isEditable={isEditing}
          keyboardType="email-address"
        />
        <AccountInfoField
          label="Phone"
          value={userData.phone}
          onChangeText={(value) => handleFieldChange("phone", value)}
          isEditable={isEditing}
          keyboardType="phone-pad"
        />
      </UserAccountSection>

      <UserAccountSection title="Contact Information">
        <AccountInfoField
          label="First Name"
          value={userData.firstName}
          onChangeText={(value) => handleFieldChange("firstName", value)}
          isEditable={isEditing}
        />
        <AccountInfoField
          label="Last Name"
          value={userData.lastName}
          onChangeText={(value) => handleFieldChange("lastName", value)}
          isEditable={isEditing}
        />
        <AccountInfoField
          label="Location"
          value={userData.location}
          onChangeText={(value) => handleFieldChange("location", value)}
          isEditable={isEditing}
        />
      </UserAccountSection>

      <UserAccountSection title="About">
        <AccountInfoField
          label="Bio"
          value={userData.bio}
          onChangeText={(value) => handleFieldChange("bio", value)}
          isEditable={isEditing}
          multiline
          numberOfLines={4}
        />
      </UserAccountSection>

      {/* API Dropdown Section */}
      <UserAccountSection title="Usuário">
        <UsuarioDropdown
          title="Usuários"
          placeholder="Selecione um usuário..."
          selectedNickname={selectedUserNickname}
          onSelect={(u) => setSelectedUserNickname(u.nickname)}
        />
      </UserAccountSection>

      <AccountFormActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default UserAccountForm;
