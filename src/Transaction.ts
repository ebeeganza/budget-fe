export class Transaction {
    constructor(
        public id: number,
        public trcType: string,
        public trcDest: string,
        public trcAmt: number
    ){}
}
