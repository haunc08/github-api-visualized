import Container from './Container';

export default function Page(props) {
  return (
    <main className="pt-main-p px-main-p">
      <Container {...props} />
    </main>
  );
}
