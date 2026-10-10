import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARD_KEY = 'gopher_forge_onboarded';
const PACKAGES_KEY = 'gopher_forge_packages';

export async function isOnboarded(): Promise<boolean> {
  const v = await AsyncStorage.getItem(ONBOARD_KEY);
  return v === '1';
}
export async function setOnboarded() {
  await AsyncStorage.setItem(ONBOARD_KEY, '1');
}
export async function getInstalledPackages(): Promise<string[]> {
  const v = await AsyncStorage.getItem(PACKAGES_KEY);
  return v ? JSON.parse(v) : ['golang.org/x/tools'];
}
export async function setInstalledPackages(ids: string[]) {
  await AsyncStorage.setItem(PACKAGES_KEY, JSON.stringify(ids));
}
export async function getProgress(): Promise<Record<string, string[]>> {
  const v = await AsyncStorage.getItem('gopher_progress');
  return v ? JSON.parse(v) : {};
}
export async function markLessonDone(moduleId: string, lessonId: string) {
  const p = await getProgress();
  const arr = p[moduleId] || [];
  if (!arr.includes(lessonId)) arr.push(lessonId);
  p[moduleId] = arr;
  await AsyncStorage.setItem('gopher_progress', JSON.stringify(p));
}
