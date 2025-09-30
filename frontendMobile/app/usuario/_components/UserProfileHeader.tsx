import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { SPACING, RADIUS } from "../../../theme/tokens";
import { useActiveUser } from "../../../context/ActiveUserContext";

interface UserProfileHeaderProps {
  username?: string;
  handle?: string;
  joinDate?: string;
  avatarUrl?: string;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  username,
  handle,
  joinDate = "Joined 2022",
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuDD...",
}) => {
  const t = useAppTheme();
  const { user } = useActiveUser();

  const finalUsername = username ?? user?.nome ?? "—";
  const finalHandle = handle ?? (user ? `@${user.nickname}` : "@—");

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
          resizeMode="cover"
        />
      </View>
      <View style={styles.userInfo}>
        <Text style={[styles.username, { color: t.text.primary }]}>
          {finalUsername}
        </Text>
        <Text style={[styles.handle, { color: t.text.muted }]}>
          {finalHandle}
        </Text>
        <Text style={[styles.joinDate, { color: t.text.muted }]}>
          {joinDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  userInfo: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 16,
  },
});

export default UserProfileHeader;
