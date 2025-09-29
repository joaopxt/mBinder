import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

const COLORS = {
  primary: "#f98006",
  lightBg: "#f8f7f5",
  darkBg: "#23190f",
  lightText: "#f8f7f5",
  darkText: "#23190f",
  borderLight: "rgba(35,25,15,0.2)",
  borderDark: "rgba(248,247,245,0.2)",
};

const Login = () => {
  // Dark mode forced as default (always dark)
  const [isDark] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (k: string, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (isRegister) {
      console.log("Register:", form);
    } else {
      console.log("Login:", form);
    }
  };

  const bg = isDark ? COLORS.darkBg : COLORS.lightBg;
  const textPrimary = isDark ? COLORS.lightText : COLORS.darkText;
  const textMuted = isDark ? "rgba(248,247,245,0.7)" : "rgba(35,25,15,0.7)";
  const borderColor = isDark ? COLORS.borderDark : COLORS.borderLight;
  const inputBg = isDark ? "rgba(248,247,245,0.08)" : "rgba(35,25,15,0.05)";

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.appTitle, { color: textPrimary }]}>mBinder</Text>

          <View style={styles.headerBlock}>
            <Text style={[styles.screenTitle, { color: textPrimary }]}>
              {isRegister ? "Create Account" : "Welcome Back"}
            </Text>
            <Text style={[styles.subtitle, { color: textMuted }]}>
              {isRegister
                ? "Fill in the details to create your account."
                : "Enter your credentials to access your account."}
            </Text>
          </View>

          <View
            style={[
              styles.toggleWrapper,
              {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsRegister(false)}
              style={[
                styles.toggleButton,
                !isRegister && { backgroundColor: COLORS.primary },
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: !isRegister ? "#fff" : textMuted },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsRegister(true)}
              style={[
                styles.toggleButton,
                isRegister && { backgroundColor: COLORS.primary },
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  { color: isRegister ? "#fff" : textMuted },
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            {isRegister && (
              <TextInput
                placeholder="Username"
                placeholderTextColor={textMuted}
                style={[
                  styles.input,
                  { backgroundColor: inputBg, borderColor, color: textPrimary },
                ]}
                value={form.username}
                onChangeText={(v) => handleChange("username", v)}
                autoCapitalize="none"
              />
            )}
            <TextInput
              placeholder="Email"
              placeholderTextColor={textMuted}
              style={[
                styles.input,
                { backgroundColor: inputBg, borderColor, color: textPrimary },
              ]}
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={textMuted}
              style={[
                styles.input,
                { backgroundColor: inputBg, borderColor, color: textPrimary },
              ]}
              value={form.password}
              onChangeText={(v) => handleChange("password", v)}
              secureTextEntry
              autoCapitalize="none"
            />
            {isRegister && (
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={textMuted}
                style={[
                  styles.input,
                  { backgroundColor: inputBg, borderColor, color: textPrimary },
                ]}
                value={form.confirm}
                onChangeText={(v) => handleChange("confirm", v)}
                secureTextEntry
                autoCapitalize="none"
              />
            )}

            <TouchableOpacity
              activeOpacity={0.85}
              style={[styles.submitBtn, { backgroundColor: COLORS.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>
                {isRegister ? "Register" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.footer, { color: textMuted }]}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    minHeight: "100%",
    justifyContent: "flex-start",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  headerBlock: { marginBottom: 32, alignItems: "center" },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    maxWidth: 280,
  },
  toggleWrapper: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    marginBottom: 28,
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
  },
  toggleButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  form: {
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    gap: 16,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  submitBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footer: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 40,
    lineHeight: 16,
    paddingHorizontal: 8,
  },
});

export default Login;
