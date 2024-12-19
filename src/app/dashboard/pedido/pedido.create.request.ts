export class PedidoCreateRequest {
    idcliente ?: number;
    idusuario ?: number;
    descuento ?: number;
    direccion ?: string;
    idestado ?: number;
    detalles ?: Array<{
        idproducto ?: number;
        cantidad ?: number;
    }>;
}
