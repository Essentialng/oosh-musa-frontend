interface ITask{
    index: number;
    startTIme: string;
    endTime: string;
    desc: string;
}


interface ITodo{
    index: number;
    date: string;
    isDone: boolean;
    title: string;
}


interface IAlarm{
    index: number;
    date: string;
    time: string;
    title: string;
}


export const sampleTask:ITask[] = [
    {
        index: 1,
        startTIme: '2022-05-15 10:00',
        endTime: '2022-05-15 11:00',
        desc: 'Prepare for the meeting'
    },
    {
        index: 2,
        startTIme: '2022-05-15 13:00',
        endTime: '2022-05-15 14:00',
        desc: 'Review the project progress'
    },
    {
        index: 3,
        startTIme: '2022-05-15 15:00',
        endTime: '2022-05-15 16:00',
        desc: 'Discuss the project with team'
    }
]


export const sampleTodo:ITodo[] = [
    {
        index: 1,
        date: '2022-05-15',
        isDone: false,
        title: 'Create a new feature'
    },
    {
        index: 2,
        date: '2022-05-16',
        isDone: false,
        title: 'Finish the current feature'
    },
    {
        index: 3,
        date: '2022-05-17',
        isDone: false,
        title: 'Review the code'
    }
]


export const sampleAlarm:IAlarm[] = [
    {
        index: 1,
        date: '2022-05-15',
        time: '07:00',
        title: 'Wake up'
    },
    {
        index: 2,
        date: '2022-05-15',
        time: '12:00',
        title: 'Lunch'
    },
    {
        index: 3,
        date: '2022-05-15',
        time: '18:00',
        title: 'Go to bed'
    }
]


export const weekTime = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']