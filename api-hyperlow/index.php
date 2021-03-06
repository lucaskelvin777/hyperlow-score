<?php

use Servicos\ZebraPagination;

require 'ZebraPagination.php';
require 'conexao.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$pagination = new ZebraPagination();
$records_per_page = 12;
$pagination->records_per_page($records_per_page);

function records($pesquisa = "")
{
  $db = connection();
  if (empty($pesquisa)) {
    $sql = "SELECT count(*) as rows FROM pontuacao";
    
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetch()['rows'];
  } else {
    $sql = "SELECT count(*) as rows FROM pontuacao WHERE nome like '%$pesquisa%'";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetch()['rows'];
  }
}
function get()
{
  global $pagination;
  global $records_per_page;

  $pagination->records(records());
  $sql = "SELECT id, nome,clicks_r, reinicio_fase, batidas, date_format(created_at, '%d/%m/%Y') as created_at FROM `pontuacao` order by clicks_r,reinicio_fase,batidas LIMIT " . (($pagination->get_page() - 1) * $records_per_page) . ', ' . $records_per_page . '';
  $pdo  = connection();
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  return $stmt->fetchAll();
}
function getWithSearch($pesquisa)
{
  global $pagination;
  global $records_per_page;
  $pagination->records(records($pesquisa));
  $sql = "SELECT id, nome,clicks_r, reinicio_fase, batidas, date_format(created_at, '%d/%m/%Y') as created_at FROM `pontuacao` WHERE nome like '%$pesquisa%' order by clicks_r,reinicio_fase,batidas  LIMIT " . (($pagination->get_page() - 1) * $records_per_page) . ', ' . $records_per_page . '';
  $pdo  = connection();
  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  return $stmt->fetchAll();
}


try {
  if (isset($_GET['search']) == true) {
    $search = filter_var($_GET['search'], FILTER_SANITIZE_STRING);
    echo json_encode(['data'=>getWithSearch($search), paginas=>$pagination->get_pages()]);
  } else {
    
   echo json_encode(['data'=>get(), paginas=>$pagination->get_pages()]);
  }
} catch (Exception $ex) {
  return false;
}
