import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { SPACING, RADIUS } from "../../theme/tokens";
import { useAppTheme } from "../../theme/ThemeProvider";
import FilterSection from "./FilterSection";
import FilterOptionChip from "./FilterOptionChip";
import MultiSelectChip from "./MultiSelectChip";
import { FiltersState, FilterLists } from "./types";
import ActionButton from "../common/ActionButton";

interface FilterPanelProps {
  visible: boolean;
  onClose: () => void;
  onClear: () => void;
  onApply: (filters: FiltersState) => void;
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  lists?: Partial<FilterLists>;
}

const DEFAULT_LISTS: FilterLists = {
  sets: [
    "Dominaria United",
    "War of the Spark",
    "Strixhaven",
    "Modern Horizons 2",
    "Innistrad: Midnight Hunt",
  ],
  colors: ["White", "Blue", "Black", "Red", "Green", "Colorless"],
  types: [
    "Creature",
    "Instant",
    "Sorcery",
    "Enchantment",
    "Artifact",
    "Planeswalker",
    "Land",
  ],
  rarities: ["Common", "Uncommon", "Rare", "Mythic Rare"],
};

const ANIM_DURATION = 260;

const FilterPanel: React.FC<FilterPanelProps> = ({
  visible,
  onClose,
  onClear,
  onApply,
  filters,
  setFilters,
  lists,
}) => {
  const t = useAppTheme();
  const merged = { ...DEFAULT_LISTS, ...lists };

  // Control mounting instead of using private __getValue()
  const [mounted, setMounted] = useState(visible);

  const translateY = useRef(new Animated.Value(visible ? 0 : 600)).current;
  const backdropOpacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: ANIM_DURATION,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIM_DURATION,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: ANIM_DURATION,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 600,
          duration: ANIM_DURATION,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible, backdropOpacity, translateY]);

  const toggleSet = (setName: string) => {
    setFilters((prev) => {
      const exists = prev.sets.includes(setName);
      return {
        ...prev,
        sets: exists
          ? prev.sets.filter((s) => s !== setName)
          : [...prev.sets, setName],
      };
    });
  };

  const selectSingle = (
    field: keyof Omit<FiltersState, "sets">,
    value: string
  ) =>
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? undefined : value,
    }));

  if (!mounted) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.backdrop,
          { backgroundColor: "#000", opacity: backdropOpacity },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          {
            backgroundColor: t.bg.base,
            borderTopColor: t.border.base,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handleRow}>
          <View
            style={[
              styles.handle,
              {
                backgroundColor:
                  t.mode === "dark" ? t.primarySoftAlt : t.primarySoft,
              },
            ]}
          />
        </View>

        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={[styles.headerTitle, { color: t.text.primary }]}>
            Filters
          </Text>
          <Pressable
            onPress={onClear}
            android_ripple={{ color: t.primarySoft }}
            style={styles.clearBtn}
          >
            <Text style={[styles.clearText, { color: t.primary }]}>Clear</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.xl }}
          showsVerticalScrollIndicator={false}
        >
          <FilterSection title="Set">
            {merged.sets.map((s) => (
              <MultiSelectChip
                key={s}
                label={s}
                selected={filters.sets.includes(s)}
                onToggle={() => toggleSet(s)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Color">
            {merged.colors.map((c) => (
              <FilterOptionChip
                key={c}
                label={c}
                active={filters.color === c}
                onPress={() => selectSingle("color", c)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Type">
            {merged.types.map((tp) => (
              <FilterOptionChip
                key={tp}
                label={tp}
                active={filters.type === tp}
                onPress={() => selectSingle("type", tp)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Rarity">
            {merged.rarities.map((r) => (
              <FilterOptionChip
                key={r}
                label={r}
                active={filters.rarity === r}
                onPress={() => selectSingle("rarity", r)}
              />
            ))}
          </FilterSection>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: t.border.base }]}>
          <ActionButton
            text="Apply Filters"
            variant="primary"
            full
            onPress={() => onApply(filters)}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: "90%",
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 24,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  handleRow: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  headerSpacer: { width: 48 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  clearBtn: {
    width: 48,
    alignItems: "center",
    paddingVertical: 6,
  },
  clearText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  scroll: {
    flex: 1,
  },
  footer: {
    padding: SPACING.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default FilterPanel;
