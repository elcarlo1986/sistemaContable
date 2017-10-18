export class Balance {
    
    public fecha: string;
    public debe: number;
    public haber: number;
    public saldo: number;

    constructor(fecha: string, debe: number, haber: number, saldo: number){
        this.fecha = fecha;
        this.debe = debe;
        this.haber = haber;
        this.saldo = saldo;
    }
    
}