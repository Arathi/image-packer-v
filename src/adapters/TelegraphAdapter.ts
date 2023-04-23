import { unsafeWindow } from "$";
import { ITask } from "../stores/TaskStore";

// @ts-ignore
let $ = unsafeWindow.jQuery;

export default class TelegraphAdapter {
    constructor() {
    }

    generateFileName(src: string, index: number, amount: number) {
        console.info("src = ", src);

        const url = new URL(src);
        const path = url.pathname;
        const dotIndex = path.lastIndexOf('.');
        const extName = path.substring(dotIndex);

        let fileName = `${index}`;
        const targetLength = Math.ceil(Math.log10(amount + 1));
        const padding = targetLength - fileName.length;
        if (padding > 0) {
            fileName = '0'.repeat(padding) + fileName;
        }

        return fileName + extName;
    }

    generateTasks() : ITask[] {
        let imgs = $("figure img");
        let tasks: ITask[] = [];
        let amount = imgs.length;
        imgs.map((index: number, img: HTMLImageElement) => {
            let task = {
                id: crypto.randomUUID(),
                uri: img.src,
                referer: unsafeWindow.location.href,
                fileName: this.generateFileName(img.src, index+1, amount),
            } as ITask;
            tasks.push(task);
        });
        return tasks;
    }
}