import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '@navigation/RootNavigator';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

// -- Brahmanandam funny background --
// To use the real image: replace the View below with:
//   <ImageBackground source={require('../assets/images/brahmanandam.jpg')} style={styles.heroBg} imageStyle={{opacity: 0.18}}>
const FunnyBg = () => {
  const faces = ['😂', '🤣', '😆', '😅', '🤪', '😜', '😝', '🤩'];
  return (
    <View style={styles.heroBg}>
      <View style={styles.emojiGrid}>
        {Array.from({length: 40}).map((_, i) => (
          <Text key={i} style={styles.bgEmoji}>
            {faces[i % faces.length]}
          </Text>
        ))}
      </View>
      <View style={styles.heroOverlay} />
    </View>
  );
};

const CARDS = [
  {
    key: 'Providers',
    title: 'Providers',
    subtitle: '6 service contacts',
    icon: '🔧',
    color: '#4F6EF7',
    bg: '#EEF1FF',
  },
  {
    key: 'Documents',
    title: 'Documents',
    subtitle: '8 files stored',
    icon: '📄',
    color: '#27AE60',
    bg: '#E8F8EF',
  },
  {
    key: 'TodoTasks',
    title: 'To-Do Tasks',
    subtitle: '5 pending items',
    icon: '✅',
    color: '#FF6B35',
    bg: '#FFF0EB',
  },
  {
    key: 'Appliances',
    title: 'Appliances',
    subtitle: '6 appliances tracked',
    icon: '🏠',
    color: '#8B5CF6',
    bg: '#F3EEFF',
  },
  {
    key: 'Projects',
    title: 'Projects',
    subtitle: '4 active projects',
    icon: '🔨',
    color: '#E67E22',
    bg: '#FEF3E8',
  },
];

type CardKey = 'Providers' | 'Documents' | 'TodoTasks' | 'Appliances' | 'Projects';

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavProp>();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Header */}
      <View style={styles.heroContainer}>
        <FunnyBg />
        <View style={styles.heroContent}>
          <Text style={styles.greetingSmall}>👋 Good morning!</Text>
          <Text style={styles.heroTitle}>Welcome to HomeSpace</Text>
          <Text style={styles.heroName}>Ra Jaffa! 🏡</Text>
          <Text style={styles.heroSubtitle}>Your smart home management hub</Text>
        </View>
      </View>

      {/* Quick stats strip */}
      <View style={styles.statsStrip}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>5</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>4</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>6</Text>
          <Text style={styles.statLabel}>Contacts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>8</Text>
          <Text style={styles.statLabel}>Docs</Text>
        </View>
      </View>

      {/* Section heading */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Home Dashboard</Text>
        <Text style={styles.sectionSubtitle}>Tap a card to explore</Text>
      </View>

      {/* Cards grid */}
      <View style={styles.grid}>
        {CARDS.map(card => (
          <TouchableOpacity
            key={card.key}
            style={[styles.card, {backgroundColor: card.bg}]}
            onPress={() => navigation.navigate(card.key as CardKey)}
            activeOpacity={0.8}>
            <View style={[styles.cardIconWrap, {backgroundColor: card.color + '22'}]}>
              <Text style={styles.cardIcon}>{card.icon}</Text>
            </View>
            <Text style={[styles.cardTitle, {color: card.color}]}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
            <View style={[styles.cardArrow, {backgroundColor: card.color}]}>
              <Text style={styles.cardArrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tips banner */}
      <View style={styles.tipBanner}>
        <Text style={styles.tipIcon}>💡</Text>
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>Home Tip of the Day</Text>
          <Text style={styles.tipText}>
            Check your AC filters monthly during summer. Clean filters save up to 15% energy!
          </Text>
        </View>
      </View>

      <View style={{height: 24}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EB',
  },
  // Hero
  heroContainer: {
    height: 240,
    overflow: 'hidden',
  },
  heroBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2C3E50',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  bgEmoji: {
    fontSize: 28,
    opacity: 0.25,
    margin: 2,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A2533CC',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 28,
  },
  greetingSmall: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
  },
  heroName: {
    color: '#FF6B35',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
  },
  // Stats strip
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FF6B35',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0EBE3',
  },
  // Section
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C3E50',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 14,
  },
  cardArrow: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardArrowText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  // Tip
  tipBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF8F0',
    borderRadius: 14,
    padding: 16,
    margin: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  tipIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

export default HomeScreen;
