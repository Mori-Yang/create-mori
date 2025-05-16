import { createLazyFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import logo from '../../assets/logo.svg';

export const Route = createLazyFileRoute('/')({
    component: Index
});

function Index() {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<number>(
        {
            queryKey: ['count'],
            queryFn: () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(1);
                    }, 1000);
                });
            }
        }
    )

    function handleClick() {
        queryClient.setQueryData(['count'], (oldData: number) => (oldData || 0) + 1);
    }

    return (
        <>

            <div id="container">
                <img src={logo} alt="logo" />
                <h1>Mori: Vite - React!</h1>
                <h2>{isLoading ? 'Loading...' : data}</h2>
                <button type='button' onClick={handleClick}>Add</button>
            </div>
        </>
    );
}
