import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

type Provider = {
  id: string;
  name: string;
  role: string;
  phone: string;
  rating: number;
  reviews: number;
  rate: string;
  available: boolean;
  icon: string;
  color: string;
  lastService: string;
  note: string;
};

const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    role: 'Electrician',
    phone: '+91 98765 43210',
    rating: 4.8,
    reviews: 142,
    rate: '₹500/hr',
    available: true,
    icon: '⚡',
    color: '#F59E0B',
    lastService: '15 Jan 2026',
    note: 'Fixed main panel wiring. Very reliable, always on time.',
  },
  {
    id: '2',
    name: 'Mohammed Ali',
    role: 'Plumber',
    phone: '+91 98234 56789',
    rating: 4.6,
    reviews: 98,
    rate: '₹400/hr',
    available: true,
    icon: '🔩',
    color: '#3B82F6',
    lastService: '3 Feb 2026',
    note: 'Repaired kitchen sink and bathroom geyser pipes.',
  },
  {
    id: '3',
    name: 'Suresh Reddy',
    role: 'Carpenter',
    phone: '+91 97654 32109',
    rating: 4.7,
    reviews: 76,
    rate: '₹600/hr',
    available: false,
    icon: '🪚',
    color: '#8B5CF6',
    lastService: '20 Dec 2025',
    note: 'Custom wardrobe install in master bedroom. Excellent craftsmanship.',
  },
  {
    id: '4',
    name: 'Ganesh Babu',
    role: 'Painter',
    phone: '+91 90000 12345',
    rating: 4.5,
    reviews: 54,
    rate: '₹350/hr',
    available: true,
    icon: '🎨',
    color: '#EC4899',
    lastService: '5 Nov 2025',
    note: 'Painted living room and two bedrooms. Neat finish, no mess.',
  },
  {
    id: '5',
    name: 'Vijay Kumar',
    role: 'AC Technician',
    phone: '+91 91234 56780',
    rating: 4.9,
    reviews: 201,
    rate: '₹800/hr',
    available: true,
    icon: '❄️',
    color: '#06B6D4',
    lastService: '10 Mar 2026',
    note: 'Annual service of all 3 AC units. Best AC tech in the area.',
  },
  {
    id: '6',
    name: 'Ramesh Naidu',
    role: 'Gardener',
    phone: '+91 88765 43210',
    rating: 4.4,
    reviews: 38,
    rate: '₹300/visit',
    available: true,
    icon: '🌿',
    color: '#10B981',
    lastService: '18 Mar 2026',
    note: 'Weekly garden maintenance. Planted seasonal flowers last month.',
  },
];

const Stars = ({rating}: {rating: number}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
    {[1, 2, 3, 4, 5].map(s => (
      <Text key={s} style={{fontSize: 11, color: s <= Math.round(rating) ? '#FFB800' : '#ddd'}}>
        ★
      </Text>
    ))}
    <Text style={{fontSize: 12, color: '#666', marginLeft: 4}}>
      {rating} ({PROVIDERS.find(p => p.rating === rating)?.reviews ?? 0})
    </Text>
  </View>
);

const ProviderCard = ({provider}: {provider: Provider}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, {backgroundColor: provider.color + '22'}]}>
          <Text style={styles.avatarIcon}>{provider.icon}</Text>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{provider.name}</Text>
            <View style={[styles.badge, {backgroundColor: provider.available ? '#D1FAE5' : '#FEE2E2'}]}>
              <Text style={[styles.badgeText, {color: provider.available ? '#059669' : '#DC2626'}]}>
                {provider.available ? '● Available' : '● Busy'}
              </Text>
            </View>
          </View>
          <Text style={[styles.role, {color: provider.color}]}>{provider.role}</Text>
          <Stars rating={provider.rating} />
        </View>
        <Text style={styles.rate}>{provider.rate}</Text>
      </View>

      {expanded && (
        <View style={styles.expanded}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📅 Last Service</Text>
            <Text style={styles.detailValue}>{provider.lastService}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>📝 Note</Text>
            <Text style={styles.detailValue}>{provider.note}</Text>
          </View>
          <TouchableOpacity
            style={[styles.callBtn, {backgroundColor: provider.color}]}
            onPress={() => Linking.openURL(`tel:${provider.phone}`)}>
            <Text style={styles.callBtnText}>📞 Call {provider.phone}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const ProvidersScreen = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>🔧 Service Providers</Text>
      <Text style={styles.heroSub}>Your trusted home professionals</Text>
    </View>
    {PROVIDERS.map(p => (
      <ProviderCard key={p.id} provider={p} />
    ))}
    <View style={{height: 20}} />
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F0EB'},
  content: {padding: 16},
  hero: {
    backgroundColor: '#4F6EF7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {fontSize: 20, fontWeight: '800', color: '#fff'},
  heroSub: {fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4},
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {flexDirection: 'row', alignItems: 'flex-start'},
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarIcon: {fontSize: 26},
  info: {flex: 1},
  nameRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2},
  name: {fontSize: 15, fontWeight: '700', color: '#1A1A2E'},
  badge: {borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2},
  badgeText: {fontSize: 10, fontWeight: '700'},
  role: {fontSize: 13, fontWeight: '600', marginBottom: 4},
  rate: {fontSize: 13, fontWeight: '700', color: '#FF6B35'},
  expanded: {marginTop: 14, borderTopWidth: 1, borderTopColor: '#F0EBE3', paddingTop: 12},
  detailRow: {flexDirection: 'row', marginBottom: 8, gap: 8},
  detailLabel: {fontSize: 12, color: '#999', width: 100},
  detailValue: {fontSize: 13, color: '#333', flex: 1},
  callBtn: {borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 8},
  callBtnText: {color: '#fff', fontWeight: '700', fontSize: 14},
});

export default ProvidersScreen;
