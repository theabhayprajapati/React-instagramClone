import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'

const signinpage = ({ providers }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="h-screen w-screen md:w-[50%] bg-purple-300">
          Left side
          <div className="flex justify-center items-center h-screen">
            <div className="w-[70%] h-[70%]">
              <h3 className="text-4xl  font-bold">Login for better future</h3>
              <p className="mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere,
                quaerat!
              </p>

              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="w-30 p-2 px-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-screen hidden md:inline-flex w-[50%]">
          rigth Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Assumenda exercitationem sint maiores mollitia praesentium repellat
          voluptates molestias inventore hic libero!
        </div>
      </div>
    </div>
  )
}

export default signinpage

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
