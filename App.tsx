import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { tokens } from './src/theme/tokens';
import { isOnboarded } from './src/lib/storage';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ModuleScreen } from './src/screens/ModuleScreen';
import { LessonScreen } from './src/screens/LessonScreen';
import { PlaygroundScreen } from './src/screens/PlaygroundScreen';
import { PackagesScreen } from './src/screens/PackagesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: tokens.bg, card: tokens.surface, text: tokens.text, border: tokens.border, primary: tokens.accent, notification: tokens.accent },
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const glyph: Record<string, string> = { Learn: '◧', Forge: '◈', Pkgs: '⬢' };
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={[styles.tabGlyph, focused && styles.tabGlyphActive]}>{glyph[label] || '•'}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: tokens.surface, borderTopColor: tokens.border, borderTopWidth: 1, height: 62, paddingTop: 6, paddingBottom: 8 },
        tabBarActiveTintColor: tokens.accent,
        tabBarInactiveTintColor: tokens.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
        tabBarIcon: ({ focused }) => <TabIcon label={route.name === 'Learn' ? 'Learn' : route.name === 'Forge' ? 'Forge' : 'Pkgs'} focused={focused} />,
      })}
    >
      <Tab.Screen name="Learn" component={HomeScreen} options={{ tabBarLabel: 'Learn' }} />
      <Tab.Screen name="Forge" component={PlaygroundScreen} options={{ tabBarLabel: 'Playground' }} />
      <Tab.Screen name="Pkgs" component={PackagesScreen} options={{ tabBarLabel: 'Packages' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await isOnboarded();
        setOnboarded(v);
      } catch {}
      setReady(true);
    })();
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={tokens.accent} />
        <Text style={styles.loadingText}>Gopher Forge</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: tokens.bg }, animation: 'slide_from_right' }} initialRouteName={onboarded ? 'Main' : 'Onboarding'}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Module" component={ModuleScreen} />
          <Stack.Screen name="Lesson" component={LessonScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: tokens.bg, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: tokens.textMuted, fontSize: 13, fontWeight: '700', letterSpacing: 0.6 },
  tabIcon: { width: 28, height: 28, borderRadius: 8, backgroundColor: tokens.surfaceRaised, borderWidth: 1, borderColor: tokens.border, alignItems: 'center', justifyContent: 'center' },
  tabIconActive: { backgroundColor: tokens.accent, borderColor: tokens.accent },
  tabGlyph: { color: tokens.textMuted, fontSize: 13, fontWeight: '800' },
  tabGlyphActive: { color: '#11110F' },
});
