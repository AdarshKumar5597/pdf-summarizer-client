"use client"
import Summariser from './Summariser';
import Friends from './Friends';

function Page({params}) {
  const { id } = params;

  let componentToLoad;

  switch (id) {
    case 'summarizer':
      componentToLoad = <Summariser />;
      break;
    case 'friends':
      componentToLoad = <Friends />;
      break;
    default:
      componentToLoad = <div>Invalid ID</div>;
  }

  return (
    <div>
      {componentToLoad}
    </div>
  );
}

export default Page;
