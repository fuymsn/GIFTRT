export default class Gift {
    constructor(giftId, isRead) {
        this.giftId = giftId;
        this.read = isRead || false;
    }

    read() {
        this.read = true;
        return this;
    }
}