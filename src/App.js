import React, {Component} from 'react';
import {
    Container,
    Card,
    Image,
    Icon,
    Message,
    Button,
    Label,
    Form,
    Statistic
} from 'semantic-ui-react'
import lottery from "./lottery";
import web3 from "./web3";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manager: '',
            playersSize: 0,
            balance: 0,
            loading: false,
            isManager: "none",
            thisWinner: "",
            accounts: [],
            pickingWinner: false,
            refunding: false
        }
    }

    async componentDidMount() {
        let manager = await lottery.methods.getManager().call();
        let players = await lottery.methods.getPlayers().call();
        let balance = await lottery.methods.getBalance().call();

        let accounts = await web3.eth.getAccounts();
        if (accounts[0] === manager) {
            this.setState({isManager: "inline-block"})
        }

        balance = web3.utils.fromWei(balance, "ether");

        this.setState({
            manager: manager,
            playersSize: players.length,
            balance: balance,
            accounts: accounts,
        });
    }

    entry = async () => {
        this.setState({loading: true});

        const accounts = await web3.eth.getAccounts();
        await lottery.methods.entry().send({
            from: accounts[0],
            value: "1000000000000000000"
        });
        this.setState({loading: false});
        window.location.reload(true);
    };

    pickWinner = async () => {
        this.setState({pickingWinner: true});
        await lottery.methods.pickWinner().send({
            from: this.state.accounts[0]
        });
        this.setState({pickingWinner: false});
        window.location.reload(true);
    };

    refund = async () => {
        this.setState({refunding: true});
        await lottery.methods.refund().send({
            from: this.state.accounts[0]
        });
        this.setState({refunding: false});
        window.location.reload(true);

    };


    render() {
        let {manager, playersSize, balance, loading, isManager, thisWinner, pickingWinner} = this.state;
        let winnerInfo = thisWinner &&
            <Card.Group centered>
                <Card>
                    <Card.Content>
                        <Card.Header>本次中奖</Card.Header>
                        <Card.Description>
                            <Label size="mini">
                                {thisWinner}
                            </Label>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>;

        return (
            <Container textAlign='center'>
                <br/>

                <Message positive>
                    <Message.Header>公平抽抽乐</Message.Header>
                    <p>
                        <b>谁买谁公平</b>
                    </p>
                </Message>
                <Card.Group centered>

                    <Card>
                        <Image src='/images/4d3117cda7c4488c962e5cf98eb8c1c1.png'/>
                        <Card.Content>
                            <Card.Header>抽抽乐</Card.Header>
                            <Card.Meta>
                                <span className='date'>管理员地址</span><br/>

                                <Form.Field>
                                    <Label size="mini">
                                        {manager}
                                    </Label>
                                </Form.Field>
                                <Label basic color='red' size="medium" pointing>
                                    欢迎打钱
                                </Label>

                            </Card.Meta>
                            <Card.Description>随时开奖</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                {playersSize} 参与玩家
                            </a>
                        </Card.Content>

                        <Statistic color='yellow' inverted>
                            <Statistic.Value>{balance}</Statistic.Value>
                            <Statistic.Label color="brown">ether</Statistic.Label>
                        </Statistic>
                        <Button basic color='green' onClick={this.entry}
                                loading={loading}>购买放飞梦想</Button>
                        <Button basic color='black' style={{display: isManager}}
                                onClick={this.pickWinner}
                                loading={pickingWinner}>开奖</Button>
                        <Button basic color='black' style={{display: isManager}}
                                onClick={this.refund}
                        >终止游戏并退款</Button>
                    </Card>

                </Card.Group>
                {winnerInfo}

            </Container>
        );
    }
}

export default App;
