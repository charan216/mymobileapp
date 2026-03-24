import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';

type Priority = 'high' | 'medium' | 'low';
type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
  icon: string;
  done: boolean;
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Fix leaking kitchen faucet',
    description: 'The mixer tap is dripping constantly. Call Mohammed Ali (plumber) to fix before it worsens.',
    priority: 'high',
    category: 'Plumbing',
    icon: '🚿',
    done: false,
    dueDate: 'Today',
  },
  {
    id: '2',
    title: 'Service AC units before summer',
    description: 'All 3 AC units need gas refill and filter cleaning before April heat. Book Vijay Kumar.',
    priority: 'high',
    category: 'Appliances',
    icon: '❄️',
    done: false,
    dueDate: '28 Mar 2026',
  },
  {
    id: '3',
    title: 'Paint the balcony wall',
    description: 'Balcony outer wall has peeling paint due to rain. Apply weather-proof paint.',
    priority: 'medium',
    category: 'Painting',
    icon: '🎨',
    done: false,
    dueDate: '5 Apr 2026',
  },
  {
    id: '4',
    title: 'Replace kitchen exhaust fan',
    description: 'Current exhaust fan making rattling noise. Buy a new Usha or Orient fan.',
    priority: 'medium',
    category: 'Electrical',
    icon: '💨',
    done: false,
    dueDate: '10 Apr 2026',
  },
  {
    id: '5',
    title: 'Clean water tank',
    description: 'Overhead tank and sump due for cleaning. Last done 6 months ago. Book AMC service.',
    priority: 'high',
    category: 'Maintenance',
    icon: '🪣',
    done: false,
    dueDate: '30 Mar 2026',
  },
  {
    id: '6',
    title: 'Install bathroom shelf',
    description: 'Add a wall-mounted shelf above the washbasin for toiletries. Ask Suresh (carpenter).',
    priority: 'low',
    category: 'Carpentry',
    icon: '🪵',
    done: true,
    dueDate: '15 Mar 2026',
  },
  {
    id: '7',
    title: 'Pest control treatment',
    description: 'Quarterly pest control due. Book Hicare or Urban Company for cockroach + mosquito treatment.',
    priority: 'medium',
    category: 'Maintenance',
    icon: '🐜',
    done: true,
    dueDate: '20 Mar 2026',
  },
];

const priorityConfig = {
  high: {color: '#EF4444', bg: '#FEE2E2', label: '🔴 High'},
  medium: {color: '#F59E0B', bg: '#FEF3C7', label: '🟡 Medium'},
  low: {color: '#10B981', bg: '#D1FAE5', label: '🟢 Low'},
};

const TodoTasksScreen = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const toggle = (id: string) =>
    setTasks(prev => prev.map(t => (t.id === id ? {...t, done: !t.done} : t)));

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [
      {
        id: Date.now().toString(),
        title: newTask.trim(),
        description: 'Tap to add description',
        priority: 'medium',
        category: 'General',
        icon: '📌',
        done: false,
        dueDate: 'No due date',
      },
      ...prev,
    ]);
    setNewTask('');
  };

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done,
  );
  const pending = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>✅ To-Do Tasks</Text>
        <Text style={styles.heroSub}>Stay on top of home maintenance</Text>
        <View style={styles.heroStats}>
          <Text style={styles.heroStat}>⏳ {pending} pending</Text>
          <Text style={styles.heroStat}>✔ {done} done</Text>
        </View>
        {/* Progress bar */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, {width: `${(done / tasks.length) * 100}%`}]} />
        </View>
        <Text style={styles.progressText}>
          {Math.round((done / tasks.length) * 100)}% complete
        </Text>
      </View>

      {/* Add task */}
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#bbb"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['all', 'pending', 'done'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tasks */}
      {filtered.map(task => {
        const p = priorityConfig[task.priority];
        return (
          <TouchableOpacity
            key={task.id}
            style={[styles.taskCard, task.done && styles.taskCardDone]}
            onPress={() => toggle(task.id)}
            activeOpacity={0.8}>
            <View style={[styles.checkbox, task.done && styles.checkboxDone]}>
              {task.done && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.taskContent}>
              <View style={styles.taskTitleRow}>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <Text style={[styles.taskTitle, task.done && styles.taskTitleDone]}>
                  {task.title}
                </Text>
              </View>
              <Text style={[styles.taskDesc, task.done && styles.taskDescDone]} numberOfLines={2}>
                {task.description}
              </Text>
              <View style={styles.taskMeta}>
                <View style={[styles.priorityTag, {backgroundColor: p.bg}]}>
                  <Text style={[styles.priorityText, {color: p.color}]}>{p.label}</Text>
                </View>
                <Text style={styles.dueDate}>📅 {task.dueDate}</Text>
                <Text style={styles.categoryTag}>{task.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={{height: 24}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F0EB'},
  content: {padding: 16},
  hero: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {fontSize: 20, fontWeight: '800', color: '#fff'},
  heroSub: {fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 4, marginBottom: 12},
  heroStats: {flexDirection: 'row', gap: 12, marginBottom: 12},
  heroStat: {color: '#fff', fontWeight: '700', fontSize: 13, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20},
  progressBg: {height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, overflow: 'hidden'},
  progressFill: {height: '100%', backgroundColor: '#fff', borderRadius: 3},
  progressText: {color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 6, textAlign: 'right'},
  addRow: {flexDirection: 'row', gap: 10, marginBottom: 14},
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtn: {width: 46, height: 46, backgroundColor: '#FF6B35', borderRadius: 10, alignItems: 'center', justifyContent: 'center'},
  addBtnText: {color: '#fff', fontSize: 24, fontWeight: '300', lineHeight: 28},
  filterRow: {flexDirection: 'row', gap: 8, marginBottom: 14},
  filterTab: {paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#E8E0D8'},
  filterTabActive: {backgroundColor: '#FF6B35', borderColor: '#FF6B35'},
  filterText: {fontSize: 13, color: '#999', fontWeight: '600'},
  filterTextActive: {color: '#fff'},
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  taskCardDone: {opacity: 0.6},
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxDone: {backgroundColor: '#FF6B35', borderColor: '#FF6B35'},
  checkmark: {color: '#fff', fontSize: 13, fontWeight: '800'},
  taskContent: {flex: 1},
  taskTitleRow: {flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4},
  taskIcon: {fontSize: 16},
  taskTitle: {fontSize: 14, fontWeight: '700', color: '#1A1A2E', flex: 1},
  taskTitleDone: {textDecorationLine: 'line-through', color: '#999'},
  taskDesc: {fontSize: 12, color: '#777', lineHeight: 17, marginBottom: 8},
  taskDescDone: {color: '#bbb'},
  taskMeta: {flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap'},
  priorityTag: {borderRadius: 20, paddingHorizontal: 8, paddingVertical: 2},
  priorityText: {fontSize: 10, fontWeight: '700'},
  dueDate: {fontSize: 11, color: '#999'},
  categoryTag: {fontSize: 11, color: '#4F6EF7', fontWeight: '600', backgroundColor: '#EEF1FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10},
});

export default TodoTasksScreen;
