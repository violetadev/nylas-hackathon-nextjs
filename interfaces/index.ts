export type User = {
  id: number;
  name?: string;
};

export type StringMap = {
  [key: string]: string | number | boolean;
};

export type Participant = {
  surname: string;
  given_name: string;
  email: string;
  notes: string
}

export type Event = {
  title: string;
  status?: string;
  busy?: boolean;
  when: {
      time?: string;
      start_time?: string;
      end_time?: string;
  };
  location: string;
  conferencing: {
      provider: 'Google Meet';
      autocreate: {}   
  }
}