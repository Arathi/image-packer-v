import { defineStore } from 'pinia';
import Dexie from 'dexie';

export type TaskStatus = "pending" | "submitted" | "created" | "downloading" | "success" | "failure";

export interface ITask {
    id: string;
    uri: string;
    referer: string;
    fileName: string;

    status: TaskStatus;
    lengthComputable: boolean;
    loaded: number;
    total: number;
}

export interface ITaskModifier {
    id: string;

    status?: TaskStatus;
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
}

export class Task implements ITask {
    id: string;
    uri: string;
    referer: string;
    fileName: string;

    status: TaskStatus = "pending";
    lengthComputable: boolean = false;
    loaded: number = 0;
    total: number = 0;

    constructor(options: ITask) {
        this.id = options.id;
        this.uri = options.uri;
        this.referer = options.referer;
        this.fileName = options.fileName;
    }
}

interface State {
    tasks: Task[],
    filter: TaskStatus[],
}

export const useTaskStore = defineStore('tasks', {
    state: (): State => ({
        tasks: [],
        filter: ["pending", "downloading"],
    }),

    actions: {
        // TODO 从indexedDB加载数据
        load(referer: string) {
        },

        // 添加任务，并写入到indexedDB
        addTasks(...appends: ITask[]) {
            const tasks = appends.map((options) => {
                return new Task(options);
            });
            this.tasks.push(...tasks);
            // TODO 写入到indexedDB
        },

        // 更新任务
        updateById(modifier: ITaskModifier) {
            const task = this.tasks.find(task => task.id == modifier.id);
            if (task != null) {
                if (modifier.status != undefined) {
                    task.status = modifier.status;
                }
                if (modifier.lengthComputable != undefined) {
                    task.lengthComputable = modifier.lengthComputable;
                }
                if (modifier.loaded != undefined) {
                    task.loaded = modifier.loaded;
                }
                if (modifier.total != undefined) {
                    task.total = modifier.total;
                }
            }

            // TODO 写入到indexedDB
        }
    },

    getters: {
        //
    }
});
