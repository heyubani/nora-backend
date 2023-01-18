export default {
  addBeads: `
      INSERT INTO nora_beads(
        categories,
        name,
        color,
        status,
        price,
        image_url,
        quantity,
        description
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *
      `,
  getAllBeads: `
      SELECT * FROM nora_beads
      `,
  getBeadById: `
      SELECT * FROM nora_beads WHERE id=$1
      `,
  getBeadByName: `
      SELECT * FROM nora_beads WHERE name ILIKE $1
      `,
  deleteBead: `
      DELETE  FROM nora_beads WHERE id=$1
   `,
  createOrder: `
   INSERT INTO beads_order(
    name,
    quantity,
    total_price,
    is_delivered,
    cancelled_order,
    client_address
   ) VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
   `,
  getAllBeadsOrder: `
   SELECT * FROM beads_order
   `,
  getBeadOrderById: `
   SELECT * FROM beads_order WHERE id=$1
   `,
  deleteBeadOrderById: `
   DELETE FROM beads_order WHERE id=$1
`,
  updateOrderQty: `
    UPDATE beads_order
    SET 
    quantity=$2
    WHERE id=$1
    RETURNING *
`,
  updateBeadAvailableQty: `
    UPDATE nora_beads
    SET 
    quantity=$2
    WHERE id=$1
    RETURNING *
`,
};
