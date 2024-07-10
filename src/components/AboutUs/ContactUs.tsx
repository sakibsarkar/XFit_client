import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get in Touch
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We'd love to hear from you. Whether you have a question, would
                like to provide feedback, or are interested in our services,
                please don't hesitate to reach out.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our team is dedicated to providing exceptional customer service
                and we'll do our best to respond to your inquiry promptly.
              </p>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-6 md:p-8">
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter the subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We're here to help. If you have any questions or would like more
                information, please don't hesitate to reach out.
              </p>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-6 md:p-8 space-y-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Address</h3>
                <p className="text-muted-foreground">
                  123 Main Street
                  <br />
                  Mirpur 404, dhaka
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Phone</h3>
                <p className="text-muted-foreground">(+880) 111264532</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Email</h3>
                <p className="text-muted-foreground">Xfit@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
