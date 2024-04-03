export default function PageWrapper(props: WithChildren) {
  return <div className="p-6">{props.children}</div>;
}
