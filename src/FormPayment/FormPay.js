import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Form, Image,} from "react-bootstrap";
import {useState} from "react";
import React from 'react';
import {useForm} from "react-hook-form";

const FormPay = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();


    const [feedBack, setFeedBack] = useState([]);
    const [name, setName] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [data, setData] = useState('');
    const [year, setYear] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleTextChange = (e) => {
        if (name !== '' && name.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }

        setName(e.target.value);
    }

    const cardNum = e => {
        if (cardNumber !== '' && cardNumber.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }
        setCardNumber(e.target.value);
    }

    const cardCvv = e => {
        if (cvv !== '' && cvv.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }
        setCVV(e.target.value);
    }

    const cardData = e => {
        if (data !== '' && data.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }
        setData(e.target.value);
    }
    const cardDataYears = e => {
        if (year !== '' && year.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }
        setYear(e.target.value);
    }

    const amountPay = e => {
        if (amount !== '' && amount.trim().length <= 10) {
            setMessage('Text must be at least 10 character');
        }
        setAmount(e.target.value);
    }

    const fetchFeedBack = async () => {
        const response = await fetch('https://624703f9739ac8459195eec9.mockapi.io/FeedBack');
        const data = await response.json();
        alert(`Successful Mission \n
        id: ${data[data.length - 1]['id']} \n
        name: ${data[data.length - 1]['name']} \n
        Amount: ${data[data.length - 1]['amount']}
        `)
        setFeedBack(data);
    }


    //Add FeedBack
    const addFeedBack = async (newFeedBack) => {
        try {
            const response = await fetch('https://624703f9739ac8459195eec9.mockapi.io/FeedBack', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newFeedBack)
            });
            const data = await response.json();
            setFeedBack([data, ...feedBack]);
            fetchFeedBack()
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        if (name.trim().length > 5) {
            const newFeedBack = {
                amount: amount,
                name: name,
                cardNumber: cardNumber,
                cvv: cvv,
                data: data,
                year: year,
            }
            addFeedBack(newFeedBack)

        }
        console.log({name, cardNumber, cvv, data, year, amount})
    }


    return (
        <>
            <Container>
                <div className="creditCardForm">
                    <div className="heading">
                        <h1>Bootstrap Credit Card Form Validation</h1>
                    </div>
                    <div className="payment">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>

                                <Col lg={8}>
                                    <Form.Group>
                                        <Form.Label htmlFor="owner">Owner</Form.Label>
                                        <Form.Control
                                            {...register('owner', {
                                                required: 'Поле обязательно к заполнению',
                                                minLength: {
                                                    value: 10,
                                                    message: 'Минимум 10 символов'
                                                }
                                            })}
                                            type="text"
                                            placeholder={'Write a review'}
                                            onChange={handleTextChange}
                                            value={name}
                                        />
                                    </Form.Group>
                                    <div style={
                                        'color: red'
                                    }>
                                        {errors?.owner && <p>{errors?.owner?.message || "Error!"}</p>}
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <Form.Group className={'cvv'}>
                                        <Form.Label htmlFor="owner">CVV</Form.Label>
                                        <Form.Control type="text"
                                                      {...register('cvv', {
                                                          required: true,
                                                      })}
                                                      placeholder={'Write a review'}
                                                      onChange={cardCvv}
                                                      value={cvv}/>
                                    </Form.Group>
                                </Col>
                                <Form.Group id="card-number-field">
                                    <Form.Label htmlFor="cardNumber">Card Number</Form.Label>
                                    <Form.Control type="text"
                                                  {...register('cardNumber', {
                                                      required: true,
                                                  })}
                                                  onChange={cardNum}
                                                  value={cardNumber}/>
                                </Form.Group>
                                <Form.Group id="amount">
                                    <Form.Label htmlFor="cardNumber">Amount</Form.Label>
                                    <Form.Control type="text"
                                                  {...register('cardNumberAmount', {
                                                      required: true,
                                                  })}

                                                  placeholder={'Write a review'}
                                                  onChange={amountPay}
                                                  value={amount}/>
                                </Form.Group>
                                <Form.Group id="expiration-date">
                                    <Row>
                                        <Form.Label>Expiration Date</Form.Label>
                                        <Col lg={2} className={'mt-2'}>
                                            <Form.Select
                                                {...register("months")}
                                                onChange={cardData}>
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </Form.Select>
                                        </Col>
                                        <Col lg={2} className={'mt-2 mb-3'}>
                                            <Form.Select onChange={cardDataYears}
                                                         {...register("years")}
                                            >
                                                <option value="16"> 2016</option>
                                                <option value="17"> 2017</option>
                                                <option value="18"> 2018</option>
                                                <option value="19"> 2019</option>
                                                <option value="20"> 2020</option>
                                                <option value="21"> 2021</option>
                                            </Form.Select>
                                            <div className="invalid-feedback">Example invalid select feedback</div>
                                        </Col>
                                        <Col lg={{span: 4, offset: 4}}>
                                            <Form.Group id="credit_cards">
                                                <Image src="https://bootstraptema.ru/snippets/form/2017/visa.jpg"
                                                       id="visa"/>
                                                <Image src="https://bootstraptema.ru/snippets/form/2017/mastercard.jpg"
                                                       id="mastercard"/>
                                                <Image src="https://bootstraptema.ru/snippets/form/2017/amex.jpg"
                                                       id="amex"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Row>
                            <Form.Group id="pay-now">
                                <Button variant="success" type={'submit'}>Success</Button>{' '}
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default FormPay