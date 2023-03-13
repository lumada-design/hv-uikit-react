type Entry = { name: string; description: string };

type NewEntry = {
  id: string;
  name: string;
  description: string;
  serverId: number;
  created: string;
  build: string;
  status: number;
};

const entries: Entry[] = [
  { name: "Previous", description: "Clean Data Logs" },
  { name: "Home", description: "Review Log" },
  { name: "Carriage", description: "Deploy Cloud Run" },
  { name: "Black", description: "Clean Session" },
  { name: "Forward", description: "Update Build" },
];

const getDate = (): string => {
  const start = new Date(2018, 1, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
};

const getRandomStatus = (): number => {
  return Math.floor(Math.random() * 4);
};

const getServerID = (): number =>
  Math.floor(100000000 + Math.random() * 1000000000);

const getBuild = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandEntry = (): Entry =>
  entries[Math.floor(Math.random() * entries.length)];

const getNewEntry = (i: number): NewEntry => {
  const entry: Entry = getRandEntry();
  return {
    id: `${i + 1}`,
    name: entry.name,
    description: entry.description,
    serverId: getServerID(),
    created: getDate(),
    build: getBuild(),
    status: getRandomStatus(),
  };
};

export const makeData = (len = 10): NewEntry[] => {
  const data: NewEntry[] = [];
  for (let i = 0; i <= len; i += 1) {
    data.push(getNewEntry(i));
  }
  return data;
};
