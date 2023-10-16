import { useState } from "react";
import { Container } from "components/container/Container";
import { TokensMain } from "components/tokensList/TokensMain";
import { Metamask } from "components/metamask/Metamask";

export const MainPage = () => {
  const [account, setAccount] = useState("");

  return (
    <Container>
      <Metamask account={account} setAccount={setAccount} />
      {account && <TokensMain account={account} />}
    </Container>
  );
};
