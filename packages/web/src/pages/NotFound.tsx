import notFound from '../images/404-404error.gif';

function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <img className="h-2/8 w-2/6" src={notFound} alt="Imagem de gato de ponta cabeça em um aquário, tentando pegar uma bolinha. Na tem tem a mensagem -Huston, we have a problem- 404 " />
    </div>
  );
}

export default NotFound;
