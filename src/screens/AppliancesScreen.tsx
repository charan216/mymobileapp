import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal} from 'react-native';

type ApplianceStatus = 'good' | 'service-due' | 'warranty-expired' | 'needs-repair';
type Appliance = {
  id: string;
  name: string;
  brand: string;
  model: string;
  room: string;
  icon: string;
  color: string;
  status: ApplianceStatus;
  purchaseDate: string;
  warrantyExpiry: string;
  lastServiced: string;
  nextService: string;
  purchasePrice: string;
  serviceContact: string;
  notes: string;
};

const APPLIANCES: Appliance[] = [
  {
    id: '1',
    name: 'Refrigerator',
    brand: 'Samsung',
    model: 'RT42T5C58S8/TL',
    room: 'Kitchen',
    icon: '🧊',
    color: '#3B82F6',
    status: 'good',
    purchaseDate: 'Aug 2022',
    warrantyExpiry: 'Aug 2027',
    lastServiced: 'Jan 2026',
    nextService: 'Jan 2027',
    purchasePrice: '₹42,000',
    serviceContact: '1800-40-7267464',
    notes: '5-year compressor warranty. Running perfectly. Keep 4 inches space from wall.',
  },
  {
    id: '2',
    name: 'Washing Machine',
    brand: 'LG',
    model: 'FHM1408BDL',
    room: 'Utility',
    icon: '🌀',
    color: '#EC4899',
    status: 'service-due',
    purchaseDate: 'Mar 2021',
    warrantyExpiry: 'Mar 2026',
    lastServiced: 'Sep 2024',
    nextService: 'Mar 2026',
    purchasePrice: '₹38,500',
    serviceContact: '1800-315-9999',
    notes: 'Front load 8kg. Service overdue! Drum cleaning required. Slightly noisy on spin cycle.',
  },
  {
    id: '3',
    name: 'AC — Living Room',
    brand: 'Daikin',
    model: 'FTKF35TV16U',
    room: 'Living Room',
    icon: '❄️',
    color: '#06B6D4',
    status: 'good',
    purchaseDate: 'Apr 2023',
    warrantyExpiry: 'Apr 2028',
    lastServiced: 'Jan 2026',
    nextService: 'Apr 2026',
    purchasePrice: '₹35,000',
    serviceContact: '1800-102-9300',
    notes: '1.5 ton 5-star inverter AC. Serviced by Vijay Kumar. Gas pressure optimal.',
  },
  {
    id: '4',
    name: 'AC — Bedroom',
    brand: 'Voltas',
    model: '185V Vectra Prima',
    room: 'Master Bedroom',
    icon: '❄️',
    color: '#8B5CF6',
    status: 'service-due',
    purchaseDate: 'May 2020',
    warrantyExpiry: 'May 2025',
    lastServiced: 'May 2024',
    nextService: 'Mar 2026',
    purchasePrice: '₹28,000',
    serviceContact: '1800-209-1771',
    notes: 'Warranty expired. Filter gets dirty quickly — clean every 3 weeks in summer.',
  },
  {
    id: '5',
    name: 'TV',
    brand: 'Sony',
    model: 'KD-55X80L',
    room: 'Living Room',
    icon: '📺',
    color: '#10B981',
    status: 'good',
    purchaseDate: 'Nov 2023',
    warrantyExpiry: 'Nov 2025',
    lastServiced: 'N/A',
    nextService: 'N/A',
    purchasePrice: '₹62,000',
    serviceContact: '1800-103-7799',
    notes: '55" 4K Android TV. Warranty just expired. No issues. Use original remote only.',
  },
  {
    id: '6',
    name: 'Water Purifier',
    brand: 'Aquaguard',
    model: 'Sure Delight NXT',
    room: 'Kitchen',
    icon: '💧',
    color: '#F59E0B',
    status: 'needs-repair',
    purchaseDate: 'Jun 2022',
    warrantyExpiry: 'Jun 2024',
    lastServiced: 'Jun 2024',
    nextService: 'Overdue',
    purchasePrice: '₹15,500',
    serviceContact: '1800-180-1177',
    notes: '⚠️ Filter change overdue by 3 months! Low water pressure noticed. Call service ASAP.',
  },
];

const statusConfig: Record<ApplianceStatus, {color: string; bg: string; label: string}> = {
  good: {color: '#27AE60', bg: '#D1FAE5', label: '✅ Good'},
  'service-due': {color: '#F59E0B', bg: '#FEF3C7', label: '⚠️ Service Due'},
  'warranty-expired': {color: '#6B7280', bg: '#F3F4F6', label: '📋 Warranty Expired'},
  'needs-repair': {color: '#EF4444', bg: '#FEE2E2', label: '🔴 Needs Repair'},
};

const AppliancesScreen = () => {
  const [selected, setSelected] = useState<Appliance | null>(null);

  const byRoom = APPLIANCES.reduce<Record<string, Appliance[]>>((acc, a) => {
    acc[a.room] = acc[a.room] ? [...acc[a.room], a] : [a];
    return acc;
  }, {});

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>🏠 Appliances</Text>
          <Text style={styles.heroSub}>Track warranties, service dates & health</Text>
          <View style={styles.heroGrid}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{APPLIANCES.length}</Text>
              <Text style={styles.heroStatLabel}>Total</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{APPLIANCES.filter(a => a.status === 'good').length}</Text>
              <Text style={styles.heroStatLabel}>Healthy</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{APPLIANCES.filter(a => a.status === 'service-due').length}</Text>
              <Text style={styles.heroStatLabel}>Svc Due</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatNum}>{APPLIANCES.filter(a => a.status === 'needs-repair').length}</Text>
              <Text style={styles.heroStatLabel}>Repair</Text>
            </View>
          </View>
        </View>

        {Object.entries(byRoom).map(([room, items]) => (
          <View key={room} style={styles.roomSection}>
            <Text style={styles.roomTitle}>🏠 {room}</Text>
            {items.map(appliance => {
              const s = statusConfig[appliance.status];
              return (
                <TouchableOpacity
                  key={appliance.id}
                  style={styles.card}
                  onPress={() => setSelected(appliance)}
                  activeOpacity={0.8}>
                  <View style={[styles.appIcon, {backgroundColor: appliance.color + '18'}]}>
                    <Text style={{fontSize: 26}}>{appliance.icon}</Text>
                  </View>
                  <View style={styles.appInfo}>
                    <Text style={styles.appName}>{appliance.name}</Text>
                    <Text style={styles.appBrand}>{appliance.brand} · {appliance.model}</Text>
                    <Text style={styles.appService}>🔧 Next: {appliance.nextService}</Text>
                  </View>
                  <View style={[styles.statusTag, {backgroundColor: s.bg}]}>
                    <Text style={[styles.statusText, {color: s.color}]}>{s.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        <View style={{height: 24}} />
      </ScrollView>

      {/* Detail Modal */}
      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.backdrop}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modal}>
              {selected && (() => {
                const s = statusConfig[selected.status];
                return (
                  <>
                    <View style={[styles.modalIcon, {backgroundColor: selected.color + '22'}]}>
                      <Text style={{fontSize: 40}}>{selected.icon}</Text>
                    </View>
                    <Text style={styles.modalName}>{selected.name}</Text>
                    <Text style={[styles.modalBrand, {color: selected.color}]}>
                      {selected.brand} · {selected.room}
                    </Text>
                    <View style={[styles.modalStatus, {backgroundColor: s.bg}]}>
                      <Text style={[styles.modalStatusText, {color: s.color}]}>{s.label}</Text>
                    </View>
                    <View style={styles.detailBox}>
                      {[
                        ['🏷 Model', selected.model],
                        ['🛒 Purchased', selected.purchaseDate],
                        ['💰 Price', selected.purchasePrice],
                        ['📋 Warranty', selected.warrantyExpiry],
                        ['🔧 Last Service', selected.lastServiced],
                        ['📅 Next Service', selected.nextService],
                        ['📞 Service No.', selected.serviceContact],
                      ].map(([label, val]) => (
                        <View key={label} style={styles.detailRow}>
                          <Text style={styles.detailLabel}>{label}</Text>
                          <Text style={styles.detailValue}>{val}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={styles.notesBox}>
                      <Text style={styles.notesLabel}>📝 Notes</Text>
                      <Text style={styles.notesText}>{selected.notes}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.closeBtn, {backgroundColor: selected.color}]}
                      onPress={() => setSelected(null)}>
                      <Text style={styles.closeBtnText}>Close</Text>
                    </TouchableOpacity>
                  </>
                );
              })()}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#F5F0EB'},
  container: {flex: 1},
  content: {padding: 16},
  hero: {backgroundColor: '#8B5CF6', borderRadius: 16, padding: 20, marginBottom: 16},
  heroTitle: {fontSize: 20, fontWeight: '800', color: '#fff'},
  heroSub: {fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4, marginBottom: 16},
  heroGrid: {flexDirection: 'row', gap: 10},
  heroStat: {flex: 1, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 10, padding: 10, alignItems: 'center'},
  heroStatNum: {fontSize: 22, fontWeight: '800', color: '#fff'},
  heroStatLabel: {fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2},
  roomSection: {marginBottom: 16},
  roomTitle: {fontSize: 13, fontWeight: '700', color: '#999', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4},
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 8,
    shadowColor: '#000', shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  appIcon: {width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12},
  appInfo: {flex: 1},
  appName: {fontSize: 15, fontWeight: '700', color: '#1A1A2E'},
  appBrand: {fontSize: 12, color: '#999', marginTop: 2},
  appService: {fontSize: 12, color: '#FF6B35', marginTop: 3, fontWeight: '600'},
  statusTag: {borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4},
  statusText: {fontSize: 10, fontWeight: '700'},
  // Modal
  backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end'},
  modalScroll: {justifyContent: 'flex-end'},
  modal: {backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 28, alignItems: 'center'},
  modalIcon: {width: 80, height: 80, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 12},
  modalName: {fontSize: 22, fontWeight: '800', color: '#1A1A2E'},
  modalBrand: {fontSize: 14, fontWeight: '600', marginTop: 4, marginBottom: 10},
  modalStatus: {borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 16},
  modalStatusText: {fontSize: 13, fontWeight: '700'},
  detailBox: {width: '100%', backgroundColor: '#F9F7F4', borderRadius: 12, padding: 14, marginBottom: 14},
  detailRow: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: '#F0EBE3'},
  detailLabel: {fontSize: 12, color: '#999'},
  detailValue: {fontSize: 13, fontWeight: '600', color: '#333', maxWidth: '55%', textAlign: 'right'},
  notesBox: {width: '100%', backgroundColor: '#FFF8F0', borderRadius: 10, padding: 14, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#8B5CF6'},
  notesLabel: {fontSize: 12, fontWeight: '700', color: '#8B5CF6', marginBottom: 6},
  notesText: {fontSize: 13, color: '#555', lineHeight: 19},
  closeBtn: {width: '100%', borderRadius: 12, paddingVertical: 14, alignItems: 'center'},
  closeBtnText: {color: '#fff', fontWeight: '700', fontSize: 16},
});

export default AppliancesScreen;
