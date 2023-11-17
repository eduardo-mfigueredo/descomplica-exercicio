import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas

// realizadas alterações
const initialRows = [
  createData(1, 'Tarefa 1', 'Modificar o código, seja alterando a parte de estilos, seja modificando algum comportamento;', '2023-11-17', '2023-11-17', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Criar um repositório no seu Git pessoal;', '2023-11-17', '2023-11-17', 'Concluída', 'Recurso 2'),
  createData(3, 'Tarefa 3', 'Fazer o commit das alterações e subir o projeto, modificado, para o seu Git pessoal.', '2022-01-04', '2022-01-05', 'Concluída', 'Recurso 3')
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
  };

    return(
    <>
    <Card>
      <Card.Header>
      <Card.Title>
          Tarefas
        </Card.Title> 
        <Card.Subtitle>
          Listagem de Tarefas
        </Card.Subtitle> 
      </Card.Header>
      <Card.Body>
        <Card.Text>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th align="right">Descrição</th>
                      <th align="right">Data de Início</th>
                      <th align="right">Data de Finalização</th>
                      <th align="right">Status</th>
                      <th align="right">Recurso</th>
                      <th align="left"></th>
                      <th align="left"></th>
                  </tr>
                </thead>
                <tbody>
                {tarefas.map((row, indice) => (
                    <tr
                    key={indice}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <td component="th" scope="row">
                          {row.idTarefa}
                      </td>
                      <td component="th" scope="row">
                          {row.tituloTarefa}
                      </td>
                      <td align="left">{row.descricaoTarefa}</td>
                      <td align="left">{row.inicioTarefa}</td>
                      <td align="left">{row.fimTarefa}</td>
                      <td align="left">{row.statusTarefa}</td>
                      <td align="left">{row.recursoTarefa}</td>
                      <td align="center">
                        <Button variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}><AiFillEdit/></Button>            
                      </td>
                      <td align="center">
                        <Button variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}><AiFillDelete/></Button>            
                      </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card.Text>
        <Row>
          <Col md="auto">
            <Button variant="success" onClick={handleOpen}>Criar Tarefa</Button>  
          </Col>
          <Col md={1}>
            <Button variant="secondary" className="ml-30">Cancelar</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
    <div>
      <Modal
        size="lg"
        show={open} onHide={handleClose}      >
        <Modal.Body>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </Modal.Body>
      </Modal>  
    </div>
    <div>
      <Modal
        size="lg"      
        show={openEditar} onHide={handleCloseEditar}
      >
        <Modal.Body>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </Modal.Body>
      </Modal>  
    </div>
  </>    
 );
};
 
export default ListarTarefa;