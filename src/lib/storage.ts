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
export type ForgeFile = { id: string; name: string; code: string };
const FORGE_FILES_KEY = 'gopher_forge_files_v1';
const FORGE_ACTIVE_KEY = 'gopher_forge_active_v1';
export async function getForgeFiles(): Promise<ForgeFile[] | null> {
  const v = await AsyncStorage.getItem(FORGE_FILES_KEY);
  return v ? JSON.parse(v) : null;
}
export async function saveForgeFiles(files: ForgeFile[]) {
  await AsyncStorage.setItem(FORGE_FILES_KEY, JSON.stringify(files));
}
export async function getForgeActiveId(): Promise<string | null> {
  return AsyncStorage.getItem(FORGE_ACTIVE_KEY);
}
export async function saveForgeActiveId(id: string) {
  await AsyncStorage.setItem(FORGE_ACTIVE_KEY, id);
}
