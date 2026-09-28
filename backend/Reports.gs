/**
 * DREAM CART BD - Users, Drive, & Reports Module
 */

function getReportsHandler(params) {
  return {
    success: true,
    data: {
      total_sales: 184500,
      total_orders: 142,
      pending_orders: 18,
      completed_orders: 118,
      return_orders: 6,
      gross_margin: 42100,
      reseller_commission: 12400
    }
  };
}
