import { Container, DisplayTextClass } from 'styles'
import Form from '../hero/form'

export default function Footer() {
  return (
    <footer className="mt-40">
      <div className="border-t border-b border-light-gray flex flex-col items-center justify-center text-center py-28">
        <p
          className={DisplayTextClass(
            'bg-radial from-light-purple to-purple inline-block text-transparent bg-clip-text mb-10',
          )}
        >
          Join Beta,
          <br />
          Get Rewards
        </p>

        <Form />
      </div>

      <Container>
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center">
          <p className={`text-base text-white font-medium mb-4 sm:mb-0`}>
            &copy; SOROS 2025
          </p>

          <div className="flex gap-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/shopsoros"
              className="text-base font-medium hover:opacity-60 transition-opacity duration-300"
            >
              X (Twitter)
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/soros"
              className="text-base font-medium hover:opacity-60 transition-opacity duration-300"
            >
              Instagram
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/shopsoros"
              className="text-base font-medium hover:opacity-60 transition-opacity duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
