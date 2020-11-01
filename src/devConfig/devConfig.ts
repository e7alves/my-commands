import { StorageResult } from './chrome.d'

const fakeStorage = {
  topics: [
    {
      id: '1',
      name: 'General',
      tasks: [],
    },
    {
      id: '2',
      name: 'Linux',
      tasks: [
        {
          id: 1,
          name: 'How to install nano editor',
        },
        {
          id: 2,
          name: 'How to list users in linux',
        },
      ],
    },
    {
      id: '3',
      name: 'Docker',
      tasks: [],
    },
  ],
  t1: {
    id: '1',
    name: 'How to install nano editor',
    link:
      'https://tecnstuff.net/how-to-install-and-use-nano-text-editor-in-linux/',
    topicId: '2',
    commands: [
      {
        id: '1',
        description:
          'To install Nano text editor on Debian or Ubuntu system, issue the following command',
        command: 'sudo apt install nano',
      },
      {
        id: '2',
        description:
          'To install the Nano text editor on CentOS or RHEL based platforms, run this command',
        command: 'sudo yum install nano\nnano --version',
      },
    ],
  },
  t2: {
    id: '2',
    name: 'How to list users in linux',
    link: 'linuxize.com',
    topicId: '2',
    commands: [],
  },
}

global.chrome = {
  storage: {
    local: {
      get: (keys: string[], callback: (result: StorageResult) => void) => {
        const result = {}
        keys.forEach((key) => {
          result[key] = fakeStorage[key]
        })
        callback(result)
      },
    },
  },
  runtime: {
    onMessage: {
      addListener: () => null,
    },
  },
}