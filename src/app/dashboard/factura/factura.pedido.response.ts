export class FacturaPedidoResponse {
    idfactura ?: number;
    cliente ?: string;
    emailcliente ?: string;
    direccionpedido ?: string;
    fechaemision ?: Date;
    montotal ?: number;
    nompago ?: string;
    urlfactura ?: string;
    estadofactura ?: boolean;
}