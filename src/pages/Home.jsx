import useStock from "../hooks/useStock";
import { Link } from "react-router-dom";

export default function Home() {
  const { items } = useStock();

  const diversity = items.length;
  const inventoryTotal = items.reduce((sum, item) => +sum + +item.quantity, 0);

  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - 10);
  const recentItems = items.filter(
    (item) => item.createdAt >= limitDate && item.createdAt <= today
  );
  const recentItemsTotal = recentItems.length;

  const lowQuantityItems = items.filter((item) => item.quantity < 10);
  const lowQuantityItemsTotal = lowQuantityItems.length;

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="dashboard-card">
          Diversidade de itens
          <span>{diversity}</span>
        </div>
        <div className="dashboard-card">
          Inventario total
          <span>{inventoryTotal}</span>
        </div>
        <div className="dashboard-card">
          Itens recentes
          <span>{recentItemsTotal}</span>
        </div>
        <div className="dashboard-card">
          Itens acabando
          <span>{lowQuantityItemsTotal}</span>
        </div>
        <div className="row">
          <div className="recent">
            <table>
              <thead>
                <tr>
                  <th>Itens Recentes</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <Link
                        to={`/items/${item.id}`}
                        className="button is-small"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="low">
            <table>
              <thead>
                <tr>
                  <th>Itens acabando</th>
                  <th>Qtd.</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {lowQuantityItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Link
                        to={`/items/${item.id}`}
                        className="button is-small"
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
