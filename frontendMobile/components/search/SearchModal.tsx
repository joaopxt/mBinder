import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppTheme } from "../../theme/ThemeProvider";
import { SPACING } from "../../theme/tokens";
import SearchBar from "./SearchBar";
import SearchPreview from "./SearchPreview";
import FilterPanel from "../../components/filter/FilterPanel";
import { FilterState } from "../../components/filter/types";
import { searchCards, SearchResult } from "../../services/libraryService";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  onSearch,
  placeholder = "Search cards...",
  filters,
  onFiltersChange,
}) => {
  const t = useAppTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [previewResults, setPreviewResults] = useState<SearchResult[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));
  const searchTimeoutRef = useRef<number>(0);

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Reset states when closing
      setSearchQuery("");
      setShowFilters(false);
      setPreviewResults([]);
      setShowPreview(false);
    }
  }, [visible, fadeAnim, slideAnim]);

  // Debounced search for live preview
  useEffect(() => {
    console.log(`[SearchModal] Search query changed: "${searchQuery}"`);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchQuery.trim().length > 0) {
      console.log(`[SearchModal] Setting up search for: "${searchQuery}"`);
      setShowPreview(true);

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          console.log(`[SearchModal] Executing search for: "${searchQuery}"`);
          const results = await searchCards(searchQuery, 5);
          console.log(`[SearchModal] Search results:`, results);
          setPreviewResults(results);
        } catch (error) {
          console.error("[SearchModal] Preview search failed:", error);
          setPreviewResults([]);
        }
      }, 300); // 300ms debounce
    } else {
      console.log(`[SearchModal] Empty query, hiding preview`);
      setShowPreview(false);
      setPreviewResults([]);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      // Navigate to full search results page
      router.push(
        `/search/SearchResults?query=${encodeURIComponent(searchQuery.trim())}`
      );
      onClose();
    }
  };

  const handleSearchChange = (text: string) => {
    console.log(`[SearchModal] handleSearchChange called with: "${text}"`);
    setSearchQuery(text);
  };

  const handlePreviewCardPress = (card: SearchResult) => {
    console.log(`[SearchModal] Preview card pressed: ${card.name}`);
    // Navigate directly to card page
    //router.push(`/components/carta/CartaPage?cardId=${card.id}`);
    onClose();
  };

  const handleFilterPress = () => {
    setShowFilters(true);
  };

  const handleFiltersClose = () => {
    setShowFilters(false);
  };

  const handleFiltersApply = (newFilters: FilterState) => {
    onFiltersChange?.(newFilters);
    setShowFilters(false);
  };

  const handleFiltersClear = () => {
    // Reset filters to default empty state
    const clearedFilters: FilterState = {
      colors: [],
      types: [],
      sets: [],
      rarity: [],
      cmc: { min: 0, max: 20 },
    };
    onFiltersChange?.(clearedFilters);
  };

  // Debug logging
  console.log(
    `[SearchModal] Render - showPreview: ${showPreview}, previewResults.length: ${previewResults.length}`
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Blurred background overlay */}
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor:
                t.mode === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.4)",
              opacity: fadeAnim,
            },
          ]}
        >
          <Pressable style={styles.backdropPress} onPress={onClose} />
        </Animated.View>

        {/* Search bar container */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              backgroundColor: t.bg.base,
              borderBottomColor:
                showPreview && previewResults.length > 0
                  ? "transparent"
                  : t.border.base,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <SearchBar
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            onFilterPress={onFiltersChange ? handleFilterPress : undefined}
            onSubmit={handleSearchSubmit}
            autoFocus
          />

          {/* Search Preview */}
          <SearchPreview
            results={previewResults}
            onCardPress={handlePreviewCardPress}
            visible={showPreview}
          />
        </Animated.View>

        {/* Filter Panel Modal */}
        {filters && onFiltersChange && (
          <FilterPanel
            visible={showFilters}
            filters={filters}
            onClose={handleFiltersClose}
            onApply={handleFiltersApply}
            onClear={handleFiltersClear}
            setFilters={onFiltersChange}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backdropPress: {
    flex: 1,
  },
  searchContainer: {
    paddingTop: Platform.OS === "ios" ? 50 : 30, // Account for status bar
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SearchModal;
