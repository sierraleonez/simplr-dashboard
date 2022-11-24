import { useAuth } from "components/Auth/provider";
import Button from "components/Button";
import { StaticPageProps } from "Constants/Pages";

function Dashboard() {
  const auth = useAuth();

  function logout() {
    auth?.setAuthState("");
  }

  return (
    <div>
      <Button onPress={logout} type="link">
        <p>Logout</p>
      </Button>
    </div>
  );
}

export async function getStaticProps(): Promise<StaticPageProps> {
  return {
    props: {
      flow: "main",
    },
  };
}

export default Dashboard;
