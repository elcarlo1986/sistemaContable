export class Asiento {
    
    public fecha: String;
    public conceptoDebe: [Concepto];
    public conceptoHaber: [Concepto];

    constructor(fecha: String, conceptoDebe: [Concepto], conceptoHaber: [Concepto]){
        this.fecha = fecha;
        this.conceptoDebe = conceptoDebe;
        this.conceptoHaber = conceptoHaber
    }
    
}

export class Concepto{
    public concepto: String;
    public monto: Number;

    constructor(concepto: String, monto: Number){
        this.concepto = concepto;
        this.monto = monto;

    }
}

