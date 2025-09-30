import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useAppTheme } from "../../../theme/ThemeProvider";
import { fetchUsuarios, UsuarioDTO } from "../../../services/usuarioService";
import { useActiveUser } from "../../../context/ActiveUserContext";

interface UsuarioDropdownProps {
  title?: string;
  placeholder?: string;
  selectedNickname?: string;
  onSelect?: (usuario: UsuarioDTO) => void;
  disabled?: boolean;
}

const UsuarioDropdown: React.FC<UsuarioDropdownProps> = ({
  title = "Usuários",
  placeholder = "Selecione um usuário...",
  selectedNickname,
  onSelect,
  disabled = false,
}) => {
  const t = useAppTheme();
  const { setUser } = useActiveUser();
  const [open, setOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<UsuarioDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [internalSelected, setInternalSelected] = useState<string | undefined>(
    selectedNickname
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsuarios();
      setUsuarios(data);
      if (
        internalSelected &&
        !data.some((u) => u.nickname === internalSelected)
      ) {
        setInternalSelected(undefined);
      }
    } catch {
      setError("Falha ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, [internalSelected]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (selectedNickname && selectedNickname !== internalSelected) {
      setInternalSelected(selectedNickname);
    }
  }, [selectedNickname, internalSelected]);

  const handleSelect = (u: UsuarioDTO) => {
    setInternalSelected(u.nickname);
    setUser(u);
    onSelect?.(u);
    setOpen(false);
  };

  const selectedLabel =
    usuarios.find((u) => u.nickname === internalSelected)?.nickname || "";

  const renderItem = ({ item }: { item: UsuarioDTO }) => {
    const active = item.nickname === internalSelected;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {
            backgroundColor: active ? t.bg.tileAlt : t.bg.tile,
            borderBottomColor: t.border.base,
          },
        ]}
        onPress={() => handleSelect(item)}
      >
        <Text
          style={{
            color: t.text.primary,
            fontWeight: active ? "600" : "400",
            fontSize: 16,
          }}
        >
          {item.nickname}
        </Text>
        {item.nome ? (
          <Text style={{ color: t.text.muted, fontSize: 12 }}>{item.nome}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: t.text.primary }]}>{title}</Text>
      <TouchableOpacity
        disabled={disabled || loading}
        style={[
          styles.button,
          {
            backgroundColor: disabled ? t.bg.tile : t.bg.input,
            borderColor: t.border.base,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={{
            color: selectedLabel ? t.text.primary : t.text.muted,
            fontSize: 16,
            flex: 1,
          }}
          numberOfLines={1}
        >
          {selectedLabel || placeholder}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={t.text.muted} />
        ) : (
          <Text style={{ color: t.text.muted, fontSize: 12 }}>▼</Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={[styles.modal, { backgroundColor: t.bg.base }]}>
            <View
              style={[styles.modalHeader, { borderBottomColor: t.border.base }]}
            >
              <Text style={[styles.modalTitle, { color: t.text.primary }]}>
                {title}
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity onPress={load} style={{ padding: 4 }}>
                  <Text style={{ color: t.text.muted, fontSize: 16 }}>↻</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  style={{ padding: 4 }}
                >
                  <Text style={{ color: t.text.muted, fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {loading ? (
              <View style={styles.center}>
                <ActivityIndicator size="large" color={t.text.muted} />
              </View>
            ) : error ? (
              <View style={styles.center}>
                <Text style={{ color: t.danger || t.text.muted }}>{error}</Text>
                <TouchableOpacity
                  onPress={load}
                  style={{ marginTop: 12, padding: 8 }}
                >
                  <Text style={{ color: t.primary, fontWeight: "600" }}>
                    Tentar novamente
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={usuarios}
                keyExtractor={(u) => String(u.id)}
                renderItem={renderItem}
                style={{ maxHeight: 340 }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 48,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    width: "100%",
    maxWidth: 420,
    maxHeight: 420,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 18, fontWeight: "600" },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  center: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default UsuarioDropdown;
