export class Balance {
    
    public fecha: String;
    public debe: [Number];
    public haber: [Number];
    public saldo: [Number];

    constructor(fecha: String, debe: [Number], haber: [Number], saldo: [number]){
        this.fecha = fecha;
        this.debe = debe;
        this.haber = haber;
        this.saldo = saldo;
    }
    
}