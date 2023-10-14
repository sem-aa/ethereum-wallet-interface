import { MetaMaskButton, useSDK } from "@metamask/sdk-react-ui";
import { Container } from "../../components/container/Container";
import { TokenList } from "../../components/tokensList/TokensList";

export const Main = () => {
  const { account } = useSDK();

  return (
    <Container>
      <MetaMaskButton
        theme={"light"}
        color="white"
        text="Connect to Metamask"
        buttonStyle={{ marginBottom: 40 }}
      />
      <button className="test"></button>
      <TokenList account={account} />
    </Container>
  );
};
