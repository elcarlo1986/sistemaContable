export class Asiento {
    
    public fecha: string;
    public debe: [Concepto];
    public haber: [Concepto];

    constructor(fecha: string, debe: [Concepto], haber: [Concepto]){
        this.fecha = fecha;
        this.debe = debe;
        this.haber = haber;
    }
    
}

export class Concepto{
    public concepto: string;
    public monto: number;

    constructor(concepto: string, monto: number){
        this.concepto = concepto;
        this.monto = monto;

    }
}

