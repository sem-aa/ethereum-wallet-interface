import { useState } from "react";
import { Container } from "components/container/Container";
import { TokenList } from "components/tokensList/TokensList";
import { Metamask } from "components/metamask/Metamask";

export const MainPage = () => {
  const [account, setAccount] = useState("");

  return (
    <Container>
      <Metamask account={account} setAccount={setAccount} />
      {account && <TokenList account={account} />}
    </Container>
  );
};
