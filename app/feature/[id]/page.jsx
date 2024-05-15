"use client"
import { useRouter } from 'next/navigation';
import Summariser from './Summariser';
import Friends from './Friends';
import Show from './Show';
import Ai from './Ai';

function Page({params}) {
  const router = useRouter();
  const { id } = params;

  let componentToLoad;

  switch (id) {
    case '1':
      componentToLoad = <Summariser />;
      break;
    case '2':
      componentToLoad = <Friends />;
      break;
    case '3':
      componentToLoad = <Show />;
      break;
    case '4':
      componentToLoad = <Ai />;
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
