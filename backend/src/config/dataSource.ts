export function isMock() {
  return process.env.DATA_SOURCE === 'mock';
}
